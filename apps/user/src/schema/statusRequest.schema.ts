import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { RequestStatus, UserCurrentStatus } from '../enum/user.enum';

export type StatusRequestDocument = StatusRequest & Document;

@Schema({ timestamps: true })
export class StatusRequest {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  userId: mongoose.Types.ObjectId;

  @Prop({ enum: UserCurrentStatus, required: true })
  type: string;

  @Prop({ default: Date.now })
  requestedAt: Date;

  @Prop({ enum: RequestStatus, default: RequestStatus.PENDING })
  status: string;

  @Prop()
  reason: string;

  @Prop()
  reviewerComment: string;

  @Prop()
  reviewedAt: Date;

  @Prop()
  reviewedBy: string;
}

export const StatusRequestSchema = SchemaFactory.createForClass(StatusRequest);
