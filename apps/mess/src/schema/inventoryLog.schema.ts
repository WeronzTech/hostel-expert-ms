import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
  InventoryLogEditedField,
  InventoryLogOperation,
} from '../enum/inventory.enum';

export type InventoryLogDocument = InventoryLog & Document;

@Schema({ timestamps: true })
export class InventoryLog {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory',
    required: true,
  })
  inventoryId: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kitchen',
    required: true,
  })
  kitchenId: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  productName: string;

  @Prop({ type: Number, required: true })
  quantityChanged: number;

  @Prop({ type: Number, required: true })
  newStock: number;

  @Prop({
    type: String,
    enum: InventoryLogOperation,
    required: true,
  })
  operation: string;

  @Prop({
    type: String,
    enum: InventoryLogEditedField,
  })
  editedField: string;

  @Prop({ type: String, trim: true })
  notes: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  performedBy: mongoose.Types.ObjectId;

  @Prop({ type: Date, default: () => new Date() })
  date: Date;
}

export const InventoryLogSchema = SchemaFactory.createForClass(InventoryLog);
