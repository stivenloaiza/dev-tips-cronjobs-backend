import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  subscribed: boolean;

  @Prop()
  frequency: string;

  @Prop()
  seniority: string;

  @Prop([String])
  programmingLanguages: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
