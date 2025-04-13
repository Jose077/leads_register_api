import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";

@Injectable()
export class LeadsProxy {
    constructor(private readonly configService: ConfigService){}
    private readonly logger = new Logger(LeadsProxy.name);

    getLeadsInstance(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://${this.configService.get<string>('RABBITMQ_USER')}:${this.configService.get<string>('RABBITMQ_PASSWORD')}@${this.configService.get<string>('RABBITMQ_URL')}`],    
                queueOptions: {durable: true},
                queue: 'leads-queue',
            }
          })
    }
}