import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DatabaseCounterDocument } from './databaseCounter.schema';

export type PropertyDocument = Property & Document;

@Schema({ timestamps: true })
export class Property {
  @Prop({ unique: true, index: true })
  propertyId: string;

  @Prop({ required: true, trim: true })
  propertyName: string;

  @Prop({
    type: {
      primary: { type: String, trim: true },
      alternate: { type: String, trim: true },
    },
    _id: false,
  })
  contacts?: { primary?: string; alternate?: string };

  @Prop({ required: true, trim: true })
  address: string;

  @Prop({ required: true, min: 1, default: 1 })
  totalBeds: number;

  @Prop({ required: true, min: 0, default: 0 })
  occupiedBeds: number;

  @Prop({ type: Map, of: Number, default: {} })
  sharingPrices: Map<string, number>;

  @Prop({ trim: true })
  preferredBy?: string; // e.g. Students, Professionals

  @Prop({ trim: true })
  propertyType?: string; // e.g. Hostel, PG, Apartment

  @Prop({ type: [String], default: [] })
  amenities: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Client', index: true })
  clientId?: string;

  @Prop({ type: Boolean, default: false, index: true })
  isDeleted: boolean;

  @Prop()
  deletedAt?: Date;
}

export const PropertySchema = SchemaFactory.createForClass(Property);

// ---------- Custom ID generation ---------- //
PropertySchema.pre<PropertyDocument>('save', async function (next) {
  try {
    if (this.isNew) {
      const now = new Date();
      const year = now.getFullYear().toString().slice(-2); // last 2 digits
      const month = String(now.getMonth() + 1).padStart(2, '0');

      const CounterModel =
        this.db.model<DatabaseCounterDocument>('DatabaseCounter');

      const counter = await CounterModel.findOneAndUpdate(
        {
          year: parseInt(year, 10),
          month: parseInt(month, 10),
        },
        { $inc: { count: 1 } },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      );

      if (!counter) {
        throw new Error('Failed to generate propertyId counter.');
      }

      this.propertyId = `HVNS-P${year}${month}${counter.count}`;
    }
    next();
  } catch (err) {
    next(err as Error);
  }
});
