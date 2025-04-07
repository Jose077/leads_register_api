import { Module } from '@nestjs/common';
import { RegisterController } from './interface/http/register.controller';
import { RegisterService } from './business/register/register.service';

@Module({
    controllers: [RegisterController],
    providers: [RegisterService],
    exports: []
})
export class RegisterModule {}
