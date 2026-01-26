import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateBudgetRequestDto } from './dto/create-budget-request.dto';
import { StorageService } from '../storage/storage.service';
import { RequestUploadUrlDto } from './dto/request-upload-url.dto';

@Injectable()
export class BudgetRequestService {
  private readonly logger = new Logger(BudgetRequestService.name);

  constructor(
    private prisma: PrismaService,
    private storageService: StorageService,
  ) {}

  /**
   * Creates a new budget request and logs the action.
   */
  async create(data: CreateBudgetRequestDto) {
    this.logger.log(`Creating new budget request for ${data.requesterEmail}`);

    return this.prisma.$transaction(async (tx: any) => {
      // 1. Create the BudgetRequest
      const budgetRequest = await tx.budgetRequest.create({
        data: {
          ...data,
          status: 'PENDING',
        },
      });

      // 2. Create AuditLog entry (as system action since it's public)
      await tx.auditLog.create({
        data: {
          action: 'CREATE',
          entityType: 'BudgetRequest',
          entityId: budgetRequest.id,
          changes: data as any, // Storing initial data as changes
          userId: null, // Public action
        },
      });

      return budgetRequest;
    });
  }

  /**
   * Generates a signed URL for uploading an attachment.
   * This is used by the frontend to upload files directly to GCS before submitting the form
   * or to attach files to an existing request.
   */
  async generateUploadUrl(dto: RequestUploadUrlDto) {
    // Generate a unique path: budget-requests/{timestamp}-{filename}
    // This prevents collisions and organizes buckets
    const uniqueFilename = `budget-requests/${Date.now()}-${dto.filename}`;
    
    return this.storageService.generateWriteUrl(uniqueFilename, dto.contentType);
  }

  // --- Admin Methods ---

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.budgetRequest.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.budgetRequest.count(),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const request = await this.prisma.budgetRequest.findUnique({
      where: { id },
      include: {
        attachments: true, // Include related assets
      },
    });

    if (!request) {
      throw new Error('Budget Request not found'); // Ideally NotFoundException
    }

    return request;
  }

  async updateStatus(id: string, status: string, adminNotes?: string) {
    return this.prisma.$transaction(async (tx: any) => {
      // 1. Get current state for audit
      const current = await tx.budgetRequest.findUnique({ where: { id } });
      if (!current) throw new Error('Budget Request not found');

      // 2. Update
      const updated = await tx.budgetRequest.update({
        where: { id },
        data: {
          status: status as any,
          adminNotes,
        },
      });

      // 3. Log Audit
      await tx.auditLog.create({
        data: {
          action: 'UPDATE_STATUS',
          entityType: 'BudgetRequest',
          entityId: id,
          changes: {
            before: { status: current.status, adminNotes: current.adminNotes },
            after: { status, adminNotes },
          },
          userId: 'ADMIN', // Placeholder until Auth is implemented
        },
      });

      return updated;
    });
  }
}
