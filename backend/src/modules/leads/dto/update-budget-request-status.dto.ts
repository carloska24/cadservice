import { IsEnum, IsNotEmpty, IsString, IsOptional } from 'class-validator';

// Enum matches schema.prisma
export enum RequestStatus {
  PENDING = 'PENDING',
  REVIEWED = 'REVIEWED',
  QUOTED = 'QUOTED',
  ARCHIVED = 'ARCHIVED',
}

export class UpdateBudgetRequestStatusDto {
  @IsEnum(RequestStatus)
  @IsNotEmpty()
  status: RequestStatus;

  @IsString()
  @IsOptional()
  adminNotes?: string;
}
