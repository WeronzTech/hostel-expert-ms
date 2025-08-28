import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ServiceHistoryDocument = ServiceHistory & Document;

@Schema({ timestamps: true })
export class ServiceHistory {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  userId: mongoose.Types.ObjectId;

  @Prop() userType: string;
  @Prop() rentType: string;
  @Prop() propertyName: string;
  @Prop() kitchenName: string;
  @Prop() sharingType: string;
  @Prop() roomNumber: string;
  @Prop() nonRefundableDeposit: number;
  @Prop() refundableDeposit: number;
  @Prop() depositAmountPaid: number;
  @Prop() rent: number;
  @Prop() serviceStartDate: Date;
  @Prop() serviceEndDate: Date;
  @Prop() reason: string;
}

export const ServiceHistorySchema =
  SchemaFactory.createForClass(ServiceHistory);
