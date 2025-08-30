import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { SessionStatus } from '../enum/session.enum';

@Schema({ timestamps: true })
export class UserSession extends Document {
  @Prop({ type: String, required: true })
  sessionToken: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  deviceInfo: string;

  @Prop({ type: String, required: false })
  ipAddress: string;

  @Prop({ type: String, required: false })
  userAgent: string;

  @Prop({ type: Date, required: true })
  expiresAt: Date;

  @Prop({
    type: String,
    enum: SessionStatus,
    default: SessionStatus.ACTIVE,
  })
  status: SessionStatus;

  @Prop({ type: Date, required: false })
  revokedAt: Date;
}

export const UserSessionSchema = SchemaFactory.createForClass(UserSession);
