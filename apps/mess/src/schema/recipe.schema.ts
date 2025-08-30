import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { InventoryItemUnits } from '../enum/inventory.enum';

export type RecipeDocument = Recipe & Document;

@Schema({ _id: false })
export class Ingredient {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory',
    required: true,
  })
  name: mongoose.Types.ObjectId;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: String, required: true, enum: InventoryItemUnits })
  unit: string;
}
const IngredientSchema = SchemaFactory.createForClass(Ingredient);

@Schema({ timestamps: true })
export class Recipe {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    type: [IngredientSchema],
    required: true,
  })
  ingredients: Ingredient[];

  @Prop({
    type: Number,
    required: true,
  })
  servings: number;

  @Prop([String])
  tags: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kitchen',
    required: true,
  })
  kitchenId: mongoose.Types.ObjectId;

  @Prop({
    type: Boolean,
    required: true,
  })
  veg: boolean;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
