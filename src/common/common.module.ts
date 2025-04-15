import { Module } from '@nestjs/common';
import { LeadsProxy } from './rabbitMQ/proxy/leads';

@Module({
    providers: [LeadsProxy],
    exports: [LeadsProxy]
})
export class CommonModule {}
