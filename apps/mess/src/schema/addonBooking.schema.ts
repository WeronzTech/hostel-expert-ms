import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { MealType, OrderStatus } from '../enum/mess.enum';

@Schema({ _id: false })
export class AddonItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Addon', required: true })
  addonId: mongoose.Types.ObjectId;

  @Prop({
    type: String,
    enum: MealType,
  })
  mealType: string;

  @Prop({ type: Number, required: true, min: 1 })
  quantity: number;

  @Prop({ type: Number, required: true, min: 0 })
  totalPrice: number;
}

const AddonItemSchema = SchemaFactory.createForClass(AddonItem);

export type AddonBookingDocument = AddonBooking & Document;

@Schema({ timestamps: true })
export class AddonBooking {
  @Prop({ type: String, unique: true })
  orderId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  propertyId: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kitchen',
    required: true,
  })
  kitchenId: mongoose.Types.ObjectId;

  @Prop({ type: [AddonItemSchema], required: true })
  addons: AddonItem[];

  @Prop({ type: Number, required: true, min: 0 })
  grandTotalPrice: number;

  @Prop({ type: Date, default: Date.now })
  bookingDate: Date;

  @Prop({ type: Date, default: null })
  deliveredDate: Date;

  @Prop({ type: Date, default: null })
  deliveryDate: Date;

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.PENDING })
  status: string;
}

export const AddonBookingSchema = SchemaFactory.createForClass(AddonBooking);
