import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPublic() {
    return this.prisma.service.findMany({
      where: { isActive: true },
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        category: true,
        // Don't fetch full description or heavy specs for list
      },
    });
  }

  async findOneBySlug(slug: string) {
    const service = await this.prisma.service.findUnique({
      where: { slug, isActive: true },
    });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async findAllAdmin() {
    return this.prisma.service.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(createServiceDto: CreateServiceDto) {
    const { name, description, technical_specs, is_active, ...rest } = createServiceDto;

    return this.prisma.service.create({
      data: {
        ...rest,
        title: name,
        fullDescription: description,
        shortDescription: description.slice(0, 160) + (description.length > 160 ? '...' : ''),
        technicalSpecs: technical_specs,
        isActive: is_active ?? true,
      },
    });
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const { name, description, technical_specs, is_active, ...rest } = updateServiceDto;

    return this.prisma.service.update({
      where: { id },
      data: {
        ...rest,
        ...(name && { title: name }),
        ...(description && {
          fullDescription: description,
          shortDescription: description.slice(0, 160) + (description.length > 160 ? '...' : ''),
        }),
        ...(technical_specs && { technicalSpecs: technical_specs }),
        ...(is_active !== undefined && { isActive: is_active }),
      },
    });
  }

  async toggleActive(id: string, isActive: boolean) {
    return this.prisma.service.update({
      where: { id },
      data: { isActive },
    });
  }
}
