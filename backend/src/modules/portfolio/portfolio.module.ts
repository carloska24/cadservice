import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { PortfolioService } from './portfolio.service';
import { PublicPortfolioController } from './public-portfolio.controller';
import { AdminPortfolioController } from './admin-portfolio.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PublicPortfolioController, AdminPortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}
