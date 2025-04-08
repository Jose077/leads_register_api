import { Module } from '@nestjs/common';
import { TestInitRMQ } from './rabbitMQ/test_init/test_init';
import { LeadsProxy } from './rabbitMQ/proxy/leads';

@Module({
    providers: [LeadsProxy, TestInitRMQ],
    exports: [LeadsProxy, TestInitRMQ]
})
export class CommonModule {}
