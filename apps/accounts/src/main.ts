import { NestFactory } from '@nestjs/core';
import { AccountsModule } from './accounts.module';
import { Transport } from '@nestjs/microservices';
import { ACCOUNTS_QUEUE } from '@app/common/token/token';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AccountsModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: ACCOUNTS_QUEUE,
      queueOptions: { durable: true },
    },
  });
  await app.listen();
}
bootstrap();
