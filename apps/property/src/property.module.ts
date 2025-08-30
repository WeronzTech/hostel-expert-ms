import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from './schema/property.schema';
import {
  DatabaseCounter,
  DatabaseCounterSchema,
} from './schema/databaseCounter.schema';
import { Maintenance, MaintenanceSchema } from './schema/maintenance.schema';
import { Room, RoomSchema } from './schema/room.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.PROPERTY_MONGO_URL!),
    MongooseModule.forFeature([
      { name: Property.name, schema: PropertySchema },
      { name: DatabaseCounter.name, schema: DatabaseCounterSchema },
      { name: Maintenance.name, schema: MaintenanceSchema },
      { name: Room.name, schema: RoomSchema },
    ]),
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
