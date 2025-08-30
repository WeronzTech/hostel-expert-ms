import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { AddOnCategory, MealType } from '../enum/mess.enum';

export type AddonDocument = Addon & Document;

@Schema({ timestamps: true })
export class Addon {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kitchen',
    required: true,
  })
  kitchenId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true })
  itemId: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true, trim: true })
  itemName: string;

  @Prop({ type: String, required: false, trim: true })
  itemDescription: string;

  @Prop({ type: String, required: true, trim: true })
  itemImage: string;

  @Prop({
    type: String,
    required: true,
    enum: AddOnCategory,
  })
  category: string;

  @Prop({ type: Number, required: true, min: 0 })
  price: number;

  @Prop({ type: Number, required: false, min: 0 })
  discountedPrice: number;

  @Prop({ type: String, required: false })
  tag: string;

  @Prop({ type: Number, required: false })
  rating: number;

  @Prop({
    type: [String],
    enum: MealType,
    required: true,
  })
  mealType: string[];

  @Prop({ type: Boolean, required: true, default: true })
  isAvailable: boolean;
}

export const AddonSchema = SchemaFactory.createForClass(Addon);

AddonSchema.path('mealType').validate(function (value: string[]) {
  return Array.isArray(value) && value.length > 0;
}, 'At least one meal type must be specified');

AddonSchema.index({ kitchenId: 1, mealType: 1, isAvailable: 1 });
