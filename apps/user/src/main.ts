import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Transport } from '@nestjs/microservices';
import { USER_QUEUE } from '@app/common/token/token';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: USER_QUEUE,
      queueOptions: { durable: true },
    },
  });
  await app.listen();
}
bootstrap();
