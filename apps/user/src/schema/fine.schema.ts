import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type FineDocument = Fine & Document;

@Schema({ timestamps: true })
export class Fine {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  reason: string;

  @Prop({ default: Date.now })
  dateIssued: Date;

  @Prop({ default: false })
  paid: boolean;
}

export const FineSchema = SchemaFactory.createForClass(Fine);
