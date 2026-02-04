import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  IsObject,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string; // Maps to 'title'

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must be lower-case and URL-friendly (e.g. "machining-cnc")',
  })
  slug: string;

  @IsString()
  @IsNotEmpty()
  description: string; // Maps to 'fullDescription' (and potentially 'shortDescription')

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsOptional()
  @IsObject()
  technical_specs?: Record<string, any>; // Maps to 'technicalSpecs'

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
