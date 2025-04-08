import { Module } from '@nestjs/common';
import { RegisterService } from './business/register/register.service';
import { RegisterController } from './interface/http/register.controller';

@Module({
    controllers: [RegisterController],
    providers: [RegisterService]
})
export class RegisterModule {}
