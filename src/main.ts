import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// ! Modules
import { AppModule } from './app.module';

// ! Configs and Services
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggerService } from './shared/logger/logger.service';
import { ConfigKeyPaths, IAppConfig } from './config';

// ! Global
import { isDev } from './global/env';
import setupSwagger from './setup-swagger';

declare const module: any

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule);

    // ! Get Config
    const configService = app.get(ConfigService<ConfigKeyPaths>)
    const { port, globalPrefix } = configService.get<IAppConfig>('app', { infer: true })

    // ! Enable CORS
    app.enableCors({
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });

    // app.setGlobalPrefix(globalPrefix);
    !isDev && app.enableShutdownHooks()

    // ! Enable Logging
    const appLogger = app.get(LoggerService);
    app.useGlobalFilters(new AllExceptionsFilter(appLogger));


    setupSwagger(app, configService)

    // ! Global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true, // Transform payloads to be objects typed according to their DTO classes
        whitelist: true, // Remove properties that don't have decorators
        forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
        transformOptions: {
          enableImplicitConversion: true, // Enable implicit conversion
        },
        errorHttpStatusCode: 422, // Use 422 for validation errors
      }),
    );

    await app.listen(port, async () => {
      const url = await app.getUrl()
      const { pid } = process

      const logger = new Logger('NestApplication')
      logger.log(`[${pid}] Server running on ${url}`)
    })

    if (module.hot) {
      module.hot.accept()
      module.hot.dispose(() => app.close())
    }
  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();
