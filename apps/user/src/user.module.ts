import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import {
  DatabaseCounter,
  DatabaseCounterSchema,
} from './schema/databaseCounter.schema';
import {
  ServiceHistory,
  ServiceHistorySchema,
} from './schema/serviceHistory.schema';
import {
  StatusRequest,
  StatusRequestSchema,
} from './schema/statusRequest.schema';
import { Fine, FineSchema } from './schema/fine.schema';
import { Client, ClientSchema } from './schema/client.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.USER_MONGO_URL!),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: DatabaseCounter.name, schema: DatabaseCounterSchema },
      { name: ServiceHistory.name, schema: ServiceHistorySchema },
      { name: StatusRequest.name, schema: StatusRequestSchema },
      { name: Fine.name, schema: FineSchema },
      { name: Client.name, schema: ClientSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
