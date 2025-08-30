import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type KitchenDocument = Kitchen & Document;

@Schema({ timestamps: true })
export class Kitchen {
  @Prop({
    type: String,
    required: true,
    trim: true,
    index: true,
  })
  name: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    required: true,
  })
  propertyId: mongoose.Types.ObjectId[];

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  location: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  incharge: mongoose.Types.ObjectId;
}

export const KitchenSchema = SchemaFactory.createForClass(Kitchen);
