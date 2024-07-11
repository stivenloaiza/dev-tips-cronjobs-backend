import { Schema, Document } from 'mongoose';

export const BotMessageSchema = new Schema({
  mediums: { type: [String], required: true },
  tip: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export interface BotMessage extends Document {
  mediums: string[];
  tip: string;
  createdAt: Date;
}
