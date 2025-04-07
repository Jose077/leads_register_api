import { Module } from '@nestjs/common';
import { RegisterController } from './register/interface/http/register.controller';
import { RegisterService } from './register/business/register/register.service';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common,module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    CommonModule
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class AppModule {}
