import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsObject,
  IsArray,
} from 'class-validator';

export class SubscriptionDto {
  @IsString()
  readonly frequency: string;

  @IsString()
  readonly levels: string;

  @IsArray()
  readonly technology: string[];
  type: any;
}

export class UserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsBoolean()
  readonly subscribed: boolean;

  @IsOptional()
  @IsObject()
  readonly subscription?: SubscriptionDto;
}
