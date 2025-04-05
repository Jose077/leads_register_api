import { Module } from '@nestjs/common';
import { LeadsProxy } from './leads-proxy';

@Module({
    providers: [LeadsProxy],
    exports: [LeadsProxy]
})
export class ProxyRMQModule {}
