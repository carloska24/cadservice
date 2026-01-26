import { IsEmail, IsNotEmpty, IsOptional, IsString, IsPhoneNumber } from 'class-validator';

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
}
