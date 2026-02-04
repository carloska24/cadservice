import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CreateBudgetRequestDto } from './dto/create-budget-request.dto';
import { StorageService } from '../storage/storage.service';
import { RequestUploadUrlDto } from './dto/request-upload-url.dto';
import { GcpConfig } from '../../config/gcp.config';
import { Prisma, RequestStatus } from '@prisma/client';

@Injectable()
export class BudgetRequestService {
  private readonly logger = new Logger(BudgetRequestService.name);

  constructor(
    private prisma: PrismaService,
    private storageService: StorageService,
    private configService: ConfigService,
  ) {}

  /**
   * Creates a new budget request and logs the action.
   */
  async create(data: CreateBudgetRequestDto) {
    console.log(`[DEBUG] Received create request for ${data.requesterEmail}`);
    try {
      return await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        console.log('[DEBUG] Transaction started');
        
        // 1. Create the BudgetRequest
        const budgetRequest = await tx.budgetRequest.create({
          data: {
            requesterName: data.requesterName,
            requesterEmail: data.requesterEmail,
            requesterPhone: data.requesterPhone,
            company: data.company,
            projectDescription: data.projectDescription,
            status: 'PENDING',
            attachments: {
              create:
                data.attachments?.map((att) => {
                  console.log(`[DEBUG] Processing attachment: ${att.filename}`);
                  return {
                    url: '', // Intentionally empty/hidden for security (Vault)
                    path: att.storagePath,
                    mimeType: att.mimeType,
                    sizeBytes: att.sizeBytes,
                    bucket:
                      this.configService.get<GcpConfig>('gcp')?.storageBucket || '',
                  };
                }) || [],
            },
          },
          include: {
            attachments: true,
          },
        });
        console.log(`[DEBUG] BudgetRequest created: ${budgetRequest.id}`);

        // 2. Create AuditLog entry (as system action since it's public)
        const maskedData = {
          ...data,
          requesterEmail: data.requesterEmail.replace(/(.{2})(.*)(@.*)/, '$1***$3'),
          requesterPhone: data.requesterPhone ? data.requesterPhone.replace(/.(?=.{4})/g, '*') : undefined,
          attachmentsCount: data.attachments?.length || 0,
        };

        await tx.auditLog.create({
          data: {
            action: 'CREATE',
            entityType: 'BudgetRequest',
            entityId: budgetRequest.id,
            changes: maskedData as unknown as Prisma.InputJsonValue,
            userId: null, // Public action
          },
        });
        console.log('[DEBUG] AuditLog created');

        return budgetRequest;
      });
    } catch (error) {
      console.error('[CRITICAL ERROR] Failed to create budget request:', error);
      if (error instanceof Error) {
        console.error('Stack:', error.stack);
      }
      throw error;
    }
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

    return this.storageService.generateWriteUrl(
      uniqueFilename,
      dto.contentType,
    );
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
      throw new NotFoundException(`Budget Request with id '${id}' not found`);
    }

    // Generate temporary signed URLs for all attachments
    const attachmentsWithUrls = await Promise.all(
      request.attachments.map(async (att) => ({
        ...att,
        signedUrl: await this.storageService.generateReadUrl(att.path),
      })),
    );

    return {
      ...request,
      attachments: attachmentsWithUrls,
    };
  }

  async updateStatus(id: string, status: string, adminNotes?: string) {
    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Get current state for audit
      const current = await tx.budgetRequest.findUnique({ where: { id } });
      if (!current)
        throw new NotFoundException(`Budget Request with id '${id}' not found`);

      // 2. Update
      const updated = await tx.budgetRequest.update({
        where: { id },
        data: {
          status: status as RequestStatus,
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
          } as unknown as Prisma.InputJsonValue,
          userId: 'ADMIN', // Placeholder until Auth is implemented
        },
      });

      return updated;
    });
  }
}
