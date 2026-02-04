import {
  Body,
  Controller,
  Post,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BudgetRequestService } from './budget-request.service';
import { CreateBudgetRequestDto } from './dto/create-budget-request.dto';
import { RequestUploadUrlDto } from './dto/request-upload-url.dto';

@Controller('api/public/v1/budget-requests')
export class PublicBudgetRequestController {
  constructor(private readonly budgetRequestService: BudgetRequestService) {}

  @Post()
  create(@Body() createBudgetRequestDto: CreateBudgetRequestDto) {
    return this.budgetRequestService.create(createBudgetRequestDto);
  }

  @Post('upload-url')
  getUploadUrl(@Body() requestUploadUrlDto: RequestUploadUrlDto) {
    return this.budgetRequestService.generateUploadUrl(requestUploadUrlDto);
  }

  @Put('mock-upload')
  @HttpCode(HttpStatus.OK)
  mockUpload(@Body() body: any) {
    return { status: 'success', message: 'MOCK: File received locally' };
  }
}
