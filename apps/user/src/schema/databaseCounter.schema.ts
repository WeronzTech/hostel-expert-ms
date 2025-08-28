import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseCounterEnum } from '../enum/user.enum';

@Schema()
export class DatabaseCounter extends Document {
  @Prop({
    type: String,
    enum: DatabaseCounterEnum,
    required: true,
  })
  type: string;

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
