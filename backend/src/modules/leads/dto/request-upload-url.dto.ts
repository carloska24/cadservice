import { IsMimeType, IsNotEmpty, IsString } from 'class-validator';

export class RequestUploadUrlDto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsMimeType()
  @IsNotEmpty()
  contentType: string;
}
