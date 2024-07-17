import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types as MongooseTypes } from 'mongoose';

@Schema({ timestamps: true })
export class Tip extends Document {
  @Prop({ unique: false })
  id: number;

  @Prop()
  img_url: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop()
  link: string;

  @Prop({ required: true })
  available: boolean;

  @Prop({ type: [{ type: MongooseTypes.ObjectId, ref: 'Level' }] })
  level: MongooseTypes.ObjectId[];

  @Prop({ type: [{ type: MongooseTypes.ObjectId, ref: 'Technology' }] })
  technology: MongooseTypes.ObjectId[];

  @Prop({ type: [{ type: MongooseTypes.ObjectId, ref: 'Subtechnology' }] })
  subtechnology: MongooseTypes.ObjectId[];

  @Prop({ type: [{ type: MongooseTypes.ObjectId, ref: 'Lang' }] })
  lang: MongooseTypes.ObjectId[];

  @Prop({ default: null })
  createdAt: Date | null;

  @Prop()
  createBy: string;

  @Prop({ default: null })
  updatedAt: Date | null;

  @Prop()
  updateBy: string;

  @Prop({ default: null })
  deletedAt: Date | null;

  @Prop()
  deleteBy: string;
}

export const TipSchema = SchemaFactory.createForClass(Tip);
