import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { MealType, OrderStatus } from '../enum/mess.enum';

export type MealBookingDocument = MealBooking & Document;

@Schema({ timestamps: true })
export class MealBooking {
  @Prop({ type: String, unique: true })
  orderId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  propertyId: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kitchen',
    required: false,
  })
  kitchenId: mongoose.Types.ObjectId;

  @Prop({ type: Date, default: () => new Date() })
  bookingDate: Date;

  @Prop({ type: Date, default: null })
  deliveredDate: Date;

  @Prop({
    type: String,
    enum: MealType,
    required: true,
  })
  mealType: string;

  @Prop({ type: String, required: true, trim: true })
  mealCategory: string;

  @Prop({
    type: String,
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: string;
}

export const MealBookingSchema = SchemaFactory.createForClass(MealBooking);
