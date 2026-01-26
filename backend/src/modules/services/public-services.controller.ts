import { Controller, Get, Param } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('api/public/v1/services')
export class PublicServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  findAll() {
    return this.servicesService.findAllPublic();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.servicesService.findOneBySlug(slug);
  }
}
