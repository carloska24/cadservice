import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  
  const configService = app.get(ConfigService);
  const nodeEnv = configService.get<string>('NODE_ENV', 'development');
  
  // CORS configuration - restrict in production
  const corsOptions = nodeEnv === 'production' 
    ? {
        origin: configService.get<string>('CORS_ORIGINS', 'https://cadservice.com.br').split(','),
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
      }
    : {
        origin: true, // Allow all in development
        credentials: true,
      };
  app.enableCors(corsOptions);

  // Use structured logger (Pino)
  app.useLogger(app.get(Logger));

  // Global Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = configService.get<number>('PORT', 8080);

  await app.listen(port);
  console.log(`Application is running on port: ${port} [${nodeEnv}]`);
}
bootstrap();

