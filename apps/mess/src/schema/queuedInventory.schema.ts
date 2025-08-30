import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { InventoryItemUnits, InventoryStatus } from '../enum/inventory.enum';
export type QueuedInventoryDocument = QueuedInventory & Document;

@Schema({ timestamps: true })
export class QueuedInventory {
  @Prop({ type: String, required: true, trim: true })
  productName: string;

  @Prop({
    type: String,
    required: true,
    enum: InventoryItemUnits,
    default: InventoryItemUnits.KILO,
  })
  quantityType: string;

  @Prop({ type: Number, required: true, min: 0 })
  stockQuantity: number;

  @Prop({ type: Number, min: 0, default: 0 })
  lowStockQuantity: number;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Kitchen', required: true },
    ],
    index: true,
    required: true,
  })
  kitchenId: mongoose.Types.ObjectId[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  categoryId: mongoose.Types.ObjectId;

  @Prop({ type: Number, required: true, min: 0 })
  pricePerUnit: number;

  @Prop({ type: Number, required: true, min: 0 })
  totalCost: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory',
    required: true,
  })
  linkedInventoryId: mongoose.Types.ObjectId;

  @Prop({
    type: String,
    enum: InventoryStatus,
    default: InventoryStatus.PENDING,
  })
  status: string;
}

export const QueuedInventorySchema =
  SchemaFactory.createForClass(QueuedInventory);

QueuedInventorySchema.path('kitchenId').validate(function (
  value: mongoose.Types.ObjectId[],
) {
  const stringIds = value.map((id) => id.toString());
  return new Set(stringIds).size === stringIds.length;
}, 'Duplicate kitchenId values are not allowed.');
