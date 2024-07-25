import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class Logger extends Document {
  @ApiProperty()
  @Prop()
  cronjobId: string;

  @ApiProperty()
  @IsString()
  @Prop()
  message: string;

  @ApiProperty()
  @IsString()
  @Prop()
  level: string;

  @ApiProperty()
  @Prop({ default: Date.now })
  timestamp: Date;
}

export const LoggerSchema = SchemaFactory.createForClass(Logger);
