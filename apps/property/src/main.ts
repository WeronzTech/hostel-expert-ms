import { NestFactory } from '@nestjs/core';
import { PropertyModule } from './property.module';
import { Transport } from '@nestjs/microservices';
import { PROPERTY_QUEUE } from '@app/common/token/token';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PropertyModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: PROPERTY_QUEUE,
      queueOptions: { durable: true },
    },
  });
  await app.listen();
}
bootstrap();
