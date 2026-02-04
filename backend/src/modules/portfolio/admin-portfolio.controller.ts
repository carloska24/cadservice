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
import { PortfolioService } from './portfolio.service';
import { Prisma } from '@prisma/client';
import { AdminGuard } from '../auth/admin.guard';

@UseGuards(AdminGuard)
@Controller('api/admin/v1/projects')
export class AdminPortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.portfolioService.findAllAdmin(Number(page), Number(limit));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.portfolioService.findOneAdmin(id);
  }

  @Post()
  async create(@Body() createPortfolioDto: Prisma.PortfolioProjectCreateInput) {
    return this.portfolioService.create(createPortfolioDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePortfolioDto: Prisma.PortfolioProjectUpdateInput,
  ) {
    return this.portfolioService.update(id, updatePortfolioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.portfolioService.delete(id);
  }
}
