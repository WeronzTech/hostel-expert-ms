import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { UserType } from '../enum/user-type.enum';

export type RoomDocument = Room & Document;

@Schema({ timestamps: true })
export class Room {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Property', index: true })
  propertyId: string;

  @Prop({ type: String, required: true })
  roomNumber: string;

  @Prop({ type: String, required: true })
  sharingType: string;

  @Prop({ type: Number, required: true })
  occupants: number;

  @Prop({ type: Number, required: true })
  vacantSlots: number;

  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: String })
  description?: string;

  @Prop({
    type: [
      {
        userId: { type: MongooseSchema.Types.ObjectId },
        userType: {
          type: String,
          enum: Object.values(UserType),
        },
      },
    ],
    default: [],
  })
  roomOccupants: {
    userId: string;
    userType: string;
  };
}

export const RoomSchema = SchemaFactory.createForClass(Room);
