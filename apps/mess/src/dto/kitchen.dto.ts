import { Schema } from 'mongoose';

export class KitchenDto {
  name: string;
  location: string;
  incharge: Schema.Types.ObjectId;
  propertyId: Schema.Types.ObjectId;
}
