import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Prisma } from '@prisma/client';
import { AdminGuard } from '../auth/admin.guard';

@UseGuards(AdminGuard)
@Controller('api/admin/v1/articles')
export class AdminArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.articleService.findAllAdmin(Number(page), Number(limit));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.articleService.findOneAdmin(id);
  }

  @Post()
  async create(@Body() createArticleDto: Prisma.ArticleCreateInput) {
    return this.articleService.create(createArticleDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: Prisma.ArticleUpdateInput,
  ) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.articleService.delete(id);
  }
}
