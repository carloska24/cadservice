import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';
import { PrismaService } from '../../database/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('ServicesService', () => {
  let service: ServicesService;
  let prisma: jest.Mocked<any>;

  const mockService = {
    id: 'service-uuid-1',
    title: 'Projeto CAD 2D',
    slug: 'projeto-cad-2d',
    shortDescription: 'Serviço de projetos CAD 2D',
    fullDescription: 'Serviço completo de projetos CAD 2D para indústria',
    category: 'Projetos',
    technicalSpecs: null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    prisma = {
      service: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
  });

  describe('findAllPublic', () => {
    it('should return only active services with selected fields', async () => {
      prisma.service.findMany.mockResolvedValue([mockService]);

      const result = await service.findAllPublic();

      expect(result).toHaveLength(1);
      expect(prisma.service.findMany).toHaveBeenCalledWith({
        where: { isActive: true },
        select: {
          id: true,
          title: true,
          slug: true,
          shortDescription: true,
          category: true,
        },
      });
    });

    it('should return empty array when no active services', async () => {
      prisma.service.findMany.mockResolvedValue([]);

      const result = await service.findAllPublic();

      expect(result).toHaveLength(0);
    });
  });

  describe('findOneBySlug', () => {
    it('should return a service by slug', async () => {
      prisma.service.findUnique.mockResolvedValue(mockService);

      const result = await service.findOneBySlug('projeto-cad-2d');

      expect(result).toBeDefined();
      expect(result.slug).toBe('projeto-cad-2d');
      expect(prisma.service.findUnique).toHaveBeenCalledWith({
        where: { slug: 'projeto-cad-2d', isActive: true },
      });
    });

    it('should throw NotFoundException when service not found', async () => {
      prisma.service.findUnique.mockResolvedValue(null);

      await expect(service.findOneBySlug('nonexistent-slug')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAllAdmin', () => {
    it('should return all services ordered by creation date', async () => {
      prisma.service.findMany.mockResolvedValue([mockService]);

      const result = await service.findAllAdmin();

      expect(result).toHaveLength(1);
      expect(prisma.service.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('create', () => {
    it('should create a service with mapped field names', async () => {
      prisma.service.create.mockResolvedValue(mockService);

      const dto = {
        name: 'Projeto CAD 2D',
        description: 'Serviço completo de projetos CAD 2D para indústria',
        slug: 'projeto-cad-2d',
        category: 'Projetos',
        technical_specs: null,
        is_active: true,
      };

      const result = await service.create(dto as any);

      expect(result).toBeDefined();
      expect(prisma.service.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          title: 'Projeto CAD 2D',
          fullDescription: 'Serviço completo de projetos CAD 2D para indústria',
          isActive: true,
        }),
      });
    });

    it('should auto-generate shortDescription from description', async () => {
      prisma.service.create.mockResolvedValue(mockService);

      const longDescription = 'A'.repeat(200);
      const dto = {
        name: 'Test',
        description: longDescription,
        slug: 'test',
        category: 'Test',
      };

      await service.create(dto as any);

      const createCall = prisma.service.create.mock.calls[0][0];
      expect(createCall.data.shortDescription).toHaveLength(163); // 160 + '...'
    });
  });

  describe('update', () => {
    it('should update service with mapped field names', async () => {
      prisma.service.update.mockResolvedValue(mockService);

      const result = await service.update('service-uuid-1', {
        name: 'Updated Name',
      } as any);

      expect(result).toBeDefined();
      expect(prisma.service.update).toHaveBeenCalledWith({
        where: { id: 'service-uuid-1' },
        data: expect.objectContaining({
          title: 'Updated Name',
        }),
      });
    });
  });

  describe('toggleActive', () => {
    it('should toggle service active status', async () => {
      prisma.service.update.mockResolvedValue({
        ...mockService,
        isActive: false,
      });

      const result = await service.toggleActive('service-uuid-1', false);

      expect(result.isActive).toBe(false);
      expect(prisma.service.update).toHaveBeenCalledWith({
        where: { id: 'service-uuid-1' },
        data: { isActive: false },
      });
    });
  });
});
