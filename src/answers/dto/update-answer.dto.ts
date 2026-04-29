import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAnswerDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;
}