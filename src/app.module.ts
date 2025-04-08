import { Module } from '@nestjs/common';
import { RegisterService } from './register/business/register/register.service';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common,module';
import { RegisterController } from './register/interface/http/register.controller';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    CommonModule
  ],
  controllers: [RegisterController],
  providers: [RegisterService]
})
export class AppModule {}
