import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBotMessageDto {
  @ApiProperty({
    description: 'Array of mediums to send the message to',
    example: ['telegram', 'discord'],
  })
  @IsArray()
  @IsNotEmpty()
  mediums: string[];

  @ApiProperty({
    description: 'Tip content to be sent',
    example: 'Tip for [Technology]!',
  })
  @IsString()
  @IsNotEmpty()
  tip: string;
}
