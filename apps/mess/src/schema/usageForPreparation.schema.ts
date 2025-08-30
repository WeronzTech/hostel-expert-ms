import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UsageForPreparationDocument = UsageForPreparation & Document;

@Schema({ timestamps: true })
export class UsageForPreparation {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kitchen',
    required: true,
    index: true,
  })
  kitchenId: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory',
    required: true,
  })
  inventoryId: mongoose.Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  productName: string;

  @Prop({
    type: Number,
    required: true,
    min: 0,
  })
  quantityUsed: number;

  @Prop({
    type: String,
    required: true,
  })
  unit: string;

  @Prop({
    type: Date,
    required: true,
    index: true,
  })
  preparationDate: Date;
}

export const UsageForPreparationSchema =
  SchemaFactory.createForClass(UsageForPreparation);

UsageForPreparationSchema.index({ kitchenId: 1, preparationDate: 1 });
