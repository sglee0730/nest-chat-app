import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { rabbitConfig } from './config/transport.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${rabbitConfig.host}:${rabbitConfig.port}`],
      queue: 'account_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(8000);
}
bootstrap();
