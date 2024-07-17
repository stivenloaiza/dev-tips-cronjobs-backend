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

  @IsArray()
  readonly levels: string[];

  @IsArray()
  readonly technology: string[];

  @IsArray()
  readonly type: string[]; // Se mantiene como un arreglo
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
