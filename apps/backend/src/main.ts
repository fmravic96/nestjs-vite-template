import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // The library will re-add the default body parsers for non-auth routes.
    // https://github.com/ThallesP/nestjs-better-auth
    bodyParser: false,
  });
  
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Configure CORS for Vite frontend running on port 3000
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(8000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

void bootstrap();
