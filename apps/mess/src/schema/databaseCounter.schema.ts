import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CounterType } from '../enum/mess.enum';

export type DatabaseCounterDocument = DatabaseCounter & Document;

@Schema()
export class DatabaseCounter {
  @Prop({
    type: String,
    enum: CounterType,
    required: true,
  })
  type: string;

  @Prop({ type: Number, required: true })
  year: number;

  @Prop({ type: Number, required: true })
  month: number;

  @Prop({ type: Number, default: 0 })
  count: number;
}

export const DatabaseCounterSchema =
  SchemaFactory.createForClass(DatabaseCounter);
