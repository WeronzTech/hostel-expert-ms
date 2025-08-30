import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DayOfWeek, MealType } from '../enum/mess.enum';

export type WeeklyMenuDocument = WeeklyMenu & Document;

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

@Schema({ _id: false })
class Meal {
  @Prop({
    type: String,
    enum: MealType,
    required: true,
  })
  mealType: string;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    ],
  })
  itemIds: mongoose.Types.ObjectId[];
}
const MealSchema = SchemaFactory.createForClass(Meal);

@Schema({ _id: false })
class DailyMenu {
  @Prop({
    type: String,
    enum: DayOfWeek,
    required: true,
  })
  dayOfWeek: string;

  @Prop({ type: [MealSchema], required: true })
  meals: Meal[];
}
const DailyMenuSchema = SchemaFactory.createForClass(DailyMenu);

DailyMenuSchema.path('meals').validate(function (v: Meal[]) {
  const mealTypes = v.map((m) => m.mealType);
  return new Set(mealTypes).size === mealTypes.length;
}, 'Duplicate meal types are not allowed for a day.');

@Schema({ _id: false })
class MealTime {
  @Prop({
    type: String,
    enum: MealType,
    required: true,
  })
  mealType: string;

  @Prop({ type: String, required: true })
  start: string;

  @Prop({ type: String, required: true })
  end: string;
}
const MealTimeSchema = SchemaFactory.createForClass(MealTime);

@Schema({ timestamps: true })
export class WeeklyMenu {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kitchen',
    required: true,
  })
  kitchenId: mongoose.Types.ObjectId;

  @Prop({ type: [DailyMenuSchema], required: true })
  menu: DailyMenu[];

  @Prop({ type: [MealTimeSchema], required: true })
  mealTimes: MealTime[];

  @Prop({ type: String, required: true, match: timeRegex })
  bookingStartTime: string;

  @Prop({ type: String, required: true, match: timeRegex })
  bookingEndTime: string;
}

export const WeeklyMenuSchema = SchemaFactory.createForClass(WeeklyMenu);

WeeklyMenuSchema.path('menu').validate(function (v: DailyMenu[]) {
  const days = v.map((d) => d.dayOfWeek);
  return new Set(days).size === days.length;
}, 'Duplicate days are not allowed in the weekly menu.');

WeeklyMenuSchema.path('mealTimes').validate(function (v: MealTime[]) {
  const types = v.map((m) => m.mealType);
  return new Set(types).size === types.length;
}, 'Duplicate meal times for a meal type are not allowed.');
