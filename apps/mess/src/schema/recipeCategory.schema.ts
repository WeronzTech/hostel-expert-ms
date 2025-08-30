import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type RecipeCategoryDocument = RecipeCategory & Document;

@Schema({ timestamps: true })
export class RecipeCategory {
  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
  })
  name: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  })
  recipes: mongoose.Types.ObjectId[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kitchen',
    required: true,
  })
  kitchenId: mongoose.Types.ObjectId;
}

export const RecipeCategorySchema =
  SchemaFactory.createForClass(RecipeCategory);
