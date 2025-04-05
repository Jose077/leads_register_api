import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProxyRMQModule } from './proxyRMQ/proxy_rmq,module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ProxyRMQModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
