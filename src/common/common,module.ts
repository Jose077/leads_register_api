import { Module } from '@nestjs/common';
import { LeadsProxy } from './proxyRMQ/leads-proxy';

@Module({
    providers: [LeadsProxy],
    exports: [LeadsProxy]
})
export class CommonModule {}
