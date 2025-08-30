import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ type: String, required: true, trim: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  propertyId: mongoose.Types.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
