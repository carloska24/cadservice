import { IsEmail, IsNotEmpty, IsOptional, IsString, IsPhoneNumber, IsArray, IsNumber, IsMimeType, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AttachmentDto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  storagePath: string;

  @IsMimeType()
  @IsNotEmpty()
  mimeType: string;

  @IsNumber()
  @IsNotEmpty()
  sizeBytes: number;
}

export class CreateBudgetRequestDto {
  @IsString()
  @IsNotEmpty()
  requesterName: string;

  @IsEmail()
  @IsNotEmpty()
  requesterEmail: string;

  @IsPhoneNumber() // Allows generic phone validation
  @IsOptional()
  requesterPhone?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsNotEmpty()
  projectDescription: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  attachments?: AttachmentDto[];
}
