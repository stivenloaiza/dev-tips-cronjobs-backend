import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsObject,
  IsArray,
  isArray,
} from 'class-validator';

export class SubscriptionDto {
  @IsString()
  readonly frequency: string;

  @IsArray()
  readonly level: string[];

  @IsArray()
  readonly technology: string[];

  @IsArray()
  readonly type: string[]; // Se mantiene como un arreglo

  @IsOptional()
  @IsObject()
  readonly channelType: string;

  @IsOptional()
  @IsString()
  readonly channelId: string;

  @IsOptional()
  @IsString()
  readonly lang: string;
}

export class UserDto {


  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsBoolean()
  readonly subscribed: boolean;

  @IsOptional()
  @IsArray()
  readonly subscriptions: SubscriptionDto;
}
