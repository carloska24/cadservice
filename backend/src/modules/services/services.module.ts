import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { PublicServicesController } from './public-services.controller';
import { AdminServicesController } from './admin-services.controller';

@Module({
  controllers: [PublicServicesController, AdminServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
