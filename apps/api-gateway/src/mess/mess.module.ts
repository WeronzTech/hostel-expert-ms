import { Module } from '@nestjs/common';
import { MessService } from './mess.service';
import { MessController } from './mess.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MESS_CLIENT, MESS_QUEUE } from '@app/common/token/token';
import { KitchenService } from './services/kitchen.service';
import { KitchenController } from './controllers/kitchen.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: MESS_CLIENT,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: MESS_QUEUE,
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [MessController, KitchenController],
  providers: [MessService, KitchenService],
})
export class MessModule {}
