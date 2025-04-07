import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";

@Injectable()
export class LeadsProxy {
    constructor(private readonly configService: ConfigService){}

    getLeadsInstance(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://${this.configService.get<string>('RABBITMQ_USER')}:${this.configService.get<string>('RABBITMQ_PASSWORD')}@${this.configService.get<string>('RABBITMQ_URL')}`],    
                queue: 'leads-queue',
            }
          })
    }

}