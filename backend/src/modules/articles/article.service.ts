import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  // PUBLIC
  async findAllPublic(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.article.findMany({
        where: { isPublished: true },
        include: {
          author: { select: { fullName: true, email: true } },
          assets: true,
        },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.article.count({ where: { isPublished: true } }),
    ]);
    return {
      data,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    };
  }

  async findBySlugPublic(slug: string) {
    const article = await this.prisma.article.findUnique({
      where: { slug },
      include: { author: { select: { fullName: true } }, assets: true },
    });
    if (!article || !article.isPublished) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }

  // ADMIN
  async findAllAdmin(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.article.findMany({
        include: { author: true, assets: true },
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.article.count(),
    ]);
    return {
      data,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    };
  }

  async findOneAdmin(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: { assets: true },
    });
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  async create(data: Prisma.ArticleCreateInput) {
    return this.prisma.article.create({ data });
  }

  async update(id: string, data: Prisma.ArticleUpdateInput) {
    return this.prisma.article.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.article.delete({
      where: { id },
    });
  }
}
