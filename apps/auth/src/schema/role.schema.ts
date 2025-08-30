import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Role extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
  })
  roleName: string;

  @Prop({
    type: [String],
    default: [],
  })
  permissions: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    default: null,
  })
  reportTo: mongoose.Types.ObjectId;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
