import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketController } from './socket.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SOCKET_CLIENT, SOCKET_QUEUE } from '@app/common/token/token';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: SOCKET_CLIENT,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: SOCKET_QUEUE,
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [SocketController],
  providers: [SocketService],
})
export class SocketModule {}
