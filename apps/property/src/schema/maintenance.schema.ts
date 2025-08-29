import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { DatabaseCounterDocument } from './databaseCounter.schema';
import { CounterType } from '../enum/counter-type.enum';
import { MaintenanceStatus } from '../enum/maintenance.enum';

export type MaintenanceDocument = HydratedDocument<Maintenance>;

@Schema({ timestamps: true })
export class Maintenance extends Document {
  @Prop({ unique: true, index: true })
  maintenanceId: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  reportedBy: Types.ObjectId;

  @Prop({ required: true })
  userName: string;

  @Prop()
  roomNo?: string;

  @Prop({ required: true })
  issue: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  issueImage?: string;

  @Prop({
    type: String,
    enum: Object.values(MaintenanceStatus),
    default: MaintenanceStatus.Pending,
    required: true,
  })
  status: string;

  @Prop()
  timeNeeded?: number; // in minutes

  @Prop({ default: Date.now })
  reportedAt: Date;

  @Prop()
  acceptedAt?: Date;

  @Prop()
  resolvedAt?: Date;

  @Prop({ maxLength: 200, trim: true })
  remarks?: string;

  @Prop({ type: Types.ObjectId, ref: 'Property', required: true })
  propertyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Staff' })
  assignedStaffId?: Types.ObjectId;
}

export const MaintenanceSchema = SchemaFactory.createForClass(Maintenance);

// ---------- Custom ID generation ---------- //
MaintenanceSchema.pre<MaintenanceDocument>('save', async function (next) {
  try {
    if (this.isNew) {
      const now = new Date();
      const year = now.getFullYear().toString().slice(-2); // last 2 digits
      const month = String(now.getMonth() + 1).padStart(2, '0');

      const CounterModel =
        this.db.model<DatabaseCounterDocument>('DatabaseCounter');

      const counter = await CounterModel.findOneAndUpdate(
        {
          type: CounterType.Maintenance,
          year: parseInt(year, 10),
          month: parseInt(month, 10),
        },
        { $inc: { count: 1 } },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      );

      if (!counter) {
        throw new Error('Failed to generate maintenanceId counter.');
      }

      this.maintenanceId = `HXPT-M${year}${month}${counter.count}`;
    }
    next();
  } catch (err) {
    next(err as Error);
  }
});
