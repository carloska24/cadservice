import { Test, TestingModule } from '@nestjs/testing';
import { BudgetRequestService } from './budget-request.service';
import { PrismaService } from '../../database/prisma.service';
import { StorageService } from '../storage/storage.service';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('BudgetRequestService', () => {
  let service: BudgetRequestService;
  let prisma: jest.Mocked<any>;
  let storageService: jest.Mocked<Partial<StorageService>>;
  let configService: jest.Mocked<Partial<ConfigService>>;

  const mockBudgetRequest = {
    id: 'br-uuid-1',
    requesterName: 'João Silva',
    requesterEmail: 'joao@example.com',
    requesterPhone: '11999999999',
    company: 'ACME Corp',
    projectDescription: 'Projeto de expansão da planta industrial',
    status: 'PENDING',
    adminNotes: null,
    attachments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const mockTx = {
      budgetRequest: {
        create: jest.fn().mockResolvedValue(mockBudgetRequest),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      auditLog: {
        create: jest.fn().mockResolvedValue({}),
      },
    };

    prisma = {
      budgetRequest: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        count: jest.fn(),
      },
      $transaction: jest.fn((fn: any) => fn(mockTx)),
    };

    storageService = {
      generateWriteUrl: jest.fn().mockResolvedValue({
        url: 'https://storage.googleapis.com/signed-url',
        path: 'budget-requests/file.pdf',
      }),
      generateReadUrl: jest
        .fn()
        .mockResolvedValue('https://storage.googleapis.com/read-signed-url'),
    };

    configService = {
      get: jest.fn().mockReturnValue({
        storageBucket: 'cadservice-assets',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BudgetRequestService,
        { provide: PrismaService, useValue: prisma },
        { provide: StorageService, useValue: storageService },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<BudgetRequestService>(BudgetRequestService);
  });

  describe('findAll', () => {
    it('should return paginated results', async () => {
      prisma.budgetRequest.findMany.mockResolvedValue([mockBudgetRequest]);
      prisma.budgetRequest.count.mockResolvedValue(1);

      const result = await service.findAll(1, 10);

      expect(result.data).toHaveLength(1);
      expect(result.meta.total).toBe(1);
      expect(result.meta.page).toBe(1);
      expect(result.meta.limit).toBe(10);
    });

    it('should enforce maximum limit of 100', async () => {
      prisma.budgetRequest.findMany.mockResolvedValue([]);
      prisma.budgetRequest.count.mockResolvedValue(0);

      const result = await service.findAll(1, 500);

      expect(result.meta.limit).toBe(100);
      expect(prisma.budgetRequest.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ take: 100 }),
      );
    });

    it('should enforce minimum page of 1', async () => {
      prisma.budgetRequest.findMany.mockResolvedValue([]);
      prisma.budgetRequest.count.mockResolvedValue(0);

      const result = await service.findAll(-5, 10);

      expect(result.meta.page).toBe(1);
    });

    it('should enforce minimum limit of 1', async () => {
      prisma.budgetRequest.findMany.mockResolvedValue([]);
      prisma.budgetRequest.count.mockResolvedValue(0);

      const result = await service.findAll(1, -10);

      expect(result.meta.limit).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return budget request with signed attachment URLs', async () => {
      const requestWithAttachments = {
        ...mockBudgetRequest,
        attachments: [
          {
            id: 'att-1',
            path: 'budget-requests/file.pdf',
            mimeType: 'application/pdf',
            sizeBytes: 1024,
          },
        ],
      };
      prisma.budgetRequest.findUnique.mockResolvedValue(requestWithAttachments);

      const result = await service.findOne('br-uuid-1');

      expect(result).toBeDefined();
      expect(result.attachments[0]).toHaveProperty('signedUrl');
      expect(storageService.generateReadUrl).toHaveBeenCalledWith(
        'budget-requests/file.pdf',
      );
    });

    it('should throw NotFoundException when not found', async () => {
      prisma.budgetRequest.findUnique.mockResolvedValue(null);

      await expect(service.findOne('nonexistent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateStatus', () => {
    it('should reject invalid status values', async () => {
      await expect(
        service.updateStatus('br-uuid-1', 'INVALID_STATUS'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException when request not found', async () => {
      const mockTx = {
        budgetRequest: {
          findUnique: jest.fn().mockResolvedValue(null),
          update: jest.fn(),
        },
        auditLog: {
          create: jest.fn(),
        },
      };
      prisma.$transaction.mockImplementation((fn: any) => fn(mockTx));

      await expect(
        service.updateStatus('nonexistent-id', 'REVIEWED'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('generateUploadUrl', () => {
    it('should generate a signed upload URL', async () => {
      const result = await service.generateUploadUrl({
        filename: 'document.pdf',
        contentType: 'application/pdf',
      });

      expect(result).toBeDefined();
      expect(storageService.generateWriteUrl).toHaveBeenCalledWith(
        expect.stringContaining('budget-requests/'),
        'application/pdf',
      );
    });

    it('should generate unique filenames with timestamp', async () => {
      await service.generateUploadUrl({
        filename: 'document.pdf',
        contentType: 'application/pdf',
      });

      const callArg = (storageService.generateWriteUrl as jest.Mock).mock
        .calls[0][0] as string;
      expect(callArg).toMatch(/^budget-requests\/\d+-document\.pdf$/);
    });
  });
});
