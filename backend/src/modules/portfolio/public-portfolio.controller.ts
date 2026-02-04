import { Controller, Get, Param, Query } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';

@Controller('api/public/v1/projects')
export class PublicPortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.portfolioService.findAllPublic(Number(page), Number(limit));
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.portfolioService.findBySlugPublic(slug);
  }
}
