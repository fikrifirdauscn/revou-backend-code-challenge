import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;
}