import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { DatabaseCounterSchema } from './schema/databaseCounter.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.USER_MONGO_URL!),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'DatabaseCounter', schema: DatabaseCounterSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
