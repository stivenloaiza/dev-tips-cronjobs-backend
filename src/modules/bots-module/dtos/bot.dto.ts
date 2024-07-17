import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class BotDto {
  @ApiProperty({
    description: 'URL for multimedia content',
    example: 'https://example.com/image.jpg',
  })
  @IsUrl()
  @IsOptional()
  img_url?: string;

  @ApiProperty({
    description: 'Title of the Tip',
    example: 'Javascript Tip',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Body for the content',
    example: 'All structure of the content for the tip',
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    description: 'Link for more info of the Tip',
    example: 'https://javascript.net/first_steps/',
  })
  @IsUrl()
  @IsNotEmpty()
  link: string;

  @ApiProperty({
    description: 'Seniority',
    example: 'Junior',
  })
  @IsString()
  @IsNotEmpty()
  level: string;

  @ApiProperty({
    description: 'Lenguage',
    example: 'Spanish',
  })
  @IsString()
  @IsNotEmpty()
  lang: string;

  @ApiProperty({
    description: 'Technology or dev lenguage',
    example: 'Javascript',
  })
  @IsString()
  @IsNotEmpty()
  technology: string;

  @ApiProperty({
    description: 'Framework',
    example: 'jwt',
  })
  @IsString()
  @IsNotEmpty()
  subtechnology: string;

  @ApiProperty({
    description: 'ID of the channel for send a Tip',
    example: '953770917346050191',
  })
  @IsString()
  @IsNotEmpty()
  channelId: string;

  @ApiProperty({
    description: 'Channer for the send of the Tip (telegram or discord)',
    example: 'discord',
  })
  @IsString()
  @IsNotEmpty()
  channelType: string;
}
