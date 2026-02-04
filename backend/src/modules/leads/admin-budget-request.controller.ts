import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { BudgetRequestService } from './budget-request.service';
import { UpdateBudgetRequestStatusDto } from './dto/update-budget-request-status.dto';

@Controller('api/admin/v1/budget-requests')
export class AdminBudgetRequestController {
  constructor(private readonly budgetRequestService: BudgetRequestService) {}

  @Get()
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.budgetRequestService.findAll(
      page ? +page : 1,
      limit ? +limit : 10,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.budgetRequestService.findOne(id);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateBudgetRequestStatusDto,
  ) {
    return this.budgetRequestService.updateStatus(
      id,
      dto.status,
      dto.adminNotes,
    );
  }
}
