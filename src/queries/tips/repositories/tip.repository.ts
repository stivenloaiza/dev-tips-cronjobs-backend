import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tip } from '../schema/tips.schema';

@Injectable()
export class TipRepository {
  constructor(@InjectModel(Tip.name) private readonly tipModel: Model<Tip>) {}

  async create(tip: Partial<Tip>): Promise<Tip> {
    const createdTip = new this.tipModel(tip);
    return createdTip.save();
  }

  async createMany(tips: Partial<Tip>[]): Promise<Tip[]> {
    return this.tipModel.create(tips);
  }

  async findById(id: string): Promise<Tip | null> {
    return this.tipModel.findById(id).exec();
  }

  async findAll(): Promise<Tip[]> {
    return this.tipModel.find().exec();
  }

  async update(id: string, updates: Partial<Tip>): Promise<Tip | null> {
    return this.tipModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async delete(id: string): Promise<Tip | null> {
    return this.tipModel.findByIdAndDelete(id).exec();
  }
}
