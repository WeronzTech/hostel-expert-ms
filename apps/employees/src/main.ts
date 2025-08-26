import { NestFactory } from '@nestjs/core';
import { EmployeesModule } from './employees.module';
import { Transport } from '@nestjs/microservices';
import { EMPLOYEES_QUEUE } from '@app/common/token/token';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(EmployeesModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: EMPLOYEES_QUEUE,
      queueOptions: { durable: true },
    },
  });
  await app.listen();
}
bootstrap();
