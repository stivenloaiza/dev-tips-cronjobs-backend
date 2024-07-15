import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCronDto {
  @ApiProperty({
    description: 'Name of the cron job',
    example: 'Email Cron',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the cron job',
    example: 'This cron job send in determinated schedule emails',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Cron schedule expression',
    example: '0 0 * * *',
  })
  @IsNotEmpty()
  @IsString()
  schedule: string;

  @ApiProperty({
    description: 'Timezone in which the cron job runs',
    example: 'Bog'
  })
  @IsNotEmpty()
  @IsString()
  timezone: string;

  @ApiProperty({
    description: 'Current status of the cron job',
    example: 'active',
  })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Role of the user who created the cron job',
    example: 'system',
  })
  @IsNotEmpty()
  @IsString()
  // dejarlo a que sea por defecto system
  createdBy: string;
}
