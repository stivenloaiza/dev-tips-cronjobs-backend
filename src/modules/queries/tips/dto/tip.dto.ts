import {
  IsString,
  IsBoolean,
  IsArray,
  IsOptional,
  IsDate,
  IsNumber,
} from 'class-validator';

export class TipDto {
  @IsNumber()
  readonly id: number;

  @IsOptional()
  @IsString()
  readonly img_url?: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly body: string;

  @IsOptional()
  @IsString()
  readonly link?: string;

  @IsBoolean()
  readonly available: boolean;

  @IsArray()
  readonly level: string[];

  @IsArray()
  readonly technology: string[];

  @IsArray()
  readonly subtechnology: string[];

  @IsArray()
  readonly lang: string[];

  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @IsOptional()
  @IsString()
  readonly createBy?: string;

  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;

  @IsOptional()
  @IsString()
  readonly updateBy?: string;

  @IsOptional()
  @IsDate()
  readonly deletedAt?: Date;

  @IsOptional()
  @IsString()
  readonly deleteBy?: string;
}
