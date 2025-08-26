import { NestFactory } from '@nestjs/core';
import { SocketModule } from './socket.module';
import { SOCKET_QUEUE } from '@app/common/token/token';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(SocketModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: SOCKET_QUEUE,
      queueOptions: { durable: true },
    },
  });
  await app.listen();
}
bootstrap();
