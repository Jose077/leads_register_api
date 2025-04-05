import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'

const configService = new ConfigService()
const appPort = configService.get<number>('APP_PORT')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(appPort ? appPort : 3000, () =>  `Server is running on port: ${appPort}` );
}
bootstrap();
