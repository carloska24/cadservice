
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('api/public/v1/articles')
export class PublicArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.articleService.findAllPublic(Number(page), Number(limit));
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.articleService.findBySlugPublic(slug);
  }
}
