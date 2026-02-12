import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const configService = app.get(ConfigService);
  const nodeEnv = configService.get<string>('NODE_ENV', 'development');

  // CORS configuration - restrict in production but allow flexible origins
  const origins = configService.get<string>('CORS_ORIGINS', '');

  const corsOptions =
    nodeEnv === 'production'
      ? {
          origin: origins ? origins.split(',') : [/run\.app$/], // Allow all run.app domains by default if not set
          methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
          allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
          credentials: true,
        }
      : {
          origin: true,
          credentials: true,
        };

  app.enableCors(corsOptions);

  // Use structured logger (Pino)
  app.useLogger(app.get(Logger));

  // Global Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = configService.get<number>('PORT') || 8080;

  await app.listen(port);
  console.log(`Application is running on port: ${port} [${nodeEnv}]`);
}

void bootstrap();
