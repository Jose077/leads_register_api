import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common';

const configService = new ConfigService()
const appPort = configService.get<number>('APP_PORT') || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(appPort, '0.0.0.0');
  Logger.log(`Server is running on port: ${appPort}`);
}
bootstrap();
