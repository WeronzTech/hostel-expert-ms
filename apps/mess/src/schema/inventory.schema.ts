import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { InventoryItemUnits } from '../enum/inventory.enum';

export type InventoryDocument = Inventory & Document;

@Schema({ timestamps: true })
export class Inventory {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  productName: string;

  @Prop({
    type: String,
    required: true,
    enum: InventoryItemUnits,
  })
  quantityType: string;

  @Prop({
    type: Number,
    required: true,
    min: 0,
    default: 0,
  })
  stockQuantity: number;

  @Prop({
    type: Number,
    min: 0,
    default: 0,
  })
  lowStockQuantity: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Kitchen' }],
    required: true,
    index: true,
    validate: {
      validator: function (value: mongoose.Types.ObjectId[]) {
        const stringIds = value.map((id) => id.toString());
        return new Set(stringIds).size === stringIds.length;
      },
      message: 'Duplicate kitchenId values are not allowed.',
    },
  })
  kitchenId: mongoose.Types.ObjectId[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    index: true,
  })
  categoryId: mongoose.Types.ObjectId;

  @Prop({
    type: Number,
    required: true,
    min: 0,
    default: 0,
  })
  pricePerUnit: number;

  @Prop({
    type: Number,
    required: true,
    min: 0,
    default: 0,
  })
  totalCost: number;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
