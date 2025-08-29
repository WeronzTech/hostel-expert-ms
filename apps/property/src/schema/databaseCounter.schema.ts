import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type DatabaseCounterDocument = DatabaseCounter & Document;

@Schema()
export class DatabaseCounter extends Document {
  @Prop({
    type: Number,
    required: true,
  })
  year: number;

  @Prop({
    type: Number,
    required: true,
  })
  month: number;

  @Prop({
    type: Number,
    default: 0,
  })
  count: number;
}

export const DatabaseCounterSchema =
  SchemaFactory.createForClass(DatabaseCounter);

// Compound index to prevent duplicate counters for the same type+year+month
DatabaseCounterSchema.index(
  { year: 1, month: 1 },
  { unique: true, name: 'uniq_type_year_month' },
);
