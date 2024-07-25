import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './libs/common/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LogService } from './libs/log/services/log.service';
import { LoggingInterceptor } from './libs/log/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const logService = app.get(LogService);
  app.useGlobalInterceptors(new LoggingInterceptor(logService));

  const port = process.env.PORT || 3000;
  app.setGlobalPrefix('api/v1');

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Dev Tips | Cron Jobs Back-End')
    .setDescription(
      'A system to manage cron jobs and programming message tasks.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const swaggerPath = 'api/swagger';

  SwaggerModule.setup(swaggerPath, app, document);
  await app.listen(port);
}

bootstrap();
