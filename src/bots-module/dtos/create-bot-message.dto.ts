import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBotMessageDto {
  @IsArray()
  @IsNotEmpty()
  mediums: string[];

  @IsString()
  @IsNotEmpty()
  message: string;
}
