
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  // PUBLIC METHODS
  async findAllPublic(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.portfolioProject.findMany({
        where: { isActive: true },
        include: { service: true, assets: true },
        orderBy: { isFeatured: 'desc' }, // Featured first
        skip,
        take: limit,
      }),
      this.prisma.portfolioProject.count({ where: { isActive: true } }),
    ]);

    return { data, meta: { total, page, limit, pages: Math.ceil(total / limit) } };
  }

  async findBySlugPublic(slug: string) {
    const project = await this.prisma.portfolioProject.findUnique({
      where: { slug },
      include: { service: true, assets: true },
    });

    if (!project || !project.isActive) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  // ADMIN METHODS
  async findAllAdmin(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.portfolioProject.findMany({
        include: { service: true, assets: true },
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.portfolioProject.count(),
    ]);
    return { data, meta: { total, page, limit, pages: Math.ceil(total / limit) } };
  }

  async findOneAdmin(id: string) {
    const project = await this.prisma.portfolioProject.findUnique({
      where: { id },
      include: { service: true, assets: true },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async create(data: Prisma.PortfolioProjectCreateInput) {
    return this.prisma.portfolioProject.create({
      data,
    });
  }

  async update(id: string, data: Prisma.PortfolioProjectUpdateInput) {
    return this.prisma.portfolioProject.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.portfolioProject.delete({
      where: { id },
    });
  }
}
