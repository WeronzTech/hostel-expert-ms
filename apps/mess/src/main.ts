import { NestFactory } from '@nestjs/core';
import { MessModule } from './mess.module';
import { Transport } from '@nestjs/microservices';
import { MESS_QUEUE } from '@app/common/token/token';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(MessModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: MESS_QUEUE,
      queueOptions: { durable: true },
    },
  });
  await app.listen();
}
bootstrap();
