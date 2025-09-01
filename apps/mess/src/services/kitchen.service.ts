import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Kitchen } from '../schema/kitchen.schema';
import { KitchenDto } from '../dto/kitchen.dto';

@Injectable()
export class KitchenService {
  constructor(
    @InjectModel(Kitchen.name) private kitchenModel: Model<Kitchen>,
  ) {}

  async createKitchen(data: KitchenDto) {
    const createdKitchen = await this.kitchenModel.create(data);
    return createdKitchen;
  }

  async updateKitchen(id: string, data: KitchenDto) {
    const updatedKitchen = await this.kitchenModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedKitchen;
  }

  async deleteKitchen(id: string) {
    const deletedKitchen = await this.kitchenModel.findByIdAndDelete(id);
    return deletedKitchen;
  }
}
