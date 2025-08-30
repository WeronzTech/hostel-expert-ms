import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class RefreshToken extends Document {
  @Prop({ type: String, required: true, unique: true })
  token: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: Date, required: true })
  expiresAt: Date;

  @Prop({ type: Boolean, default: false })
  isRevoked: boolean;

  @Prop({ type: Date, required: false })
  revokedAt: Date;

  @Prop({ type: String, required: false })
  replacedByToken: string; // For token rotation
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
