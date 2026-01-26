import { Module } from '@nestjs/common';
import { BudgetRequestService } from './budget-request.service';
import { PublicBudgetRequestController } from './public-budget-request.controller';
import { StorageModule } from '../storage/storage.module';

import { AdminBudgetRequestController } from './admin-budget-request.controller';

@Module({
  imports: [StorageModule],
  controllers: [PublicBudgetRequestController, AdminBudgetRequestController],
  providers: [BudgetRequestService],
})
export class BudgetRequestModule {}
