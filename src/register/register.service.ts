import { BadGatewayException, BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateLeadDTO } from './dtos/create_lead';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { LeadsProxy } from 'src/common/rabbitMQ/proxy/leads';

@Injectable()
export class RegisterService {
  private readonly logger = new Logger(RegisterService.name);
  private leadsRMQInstance: ClientProxy

  constructor(private readonly leadsProxyRMQ: LeadsProxy) {
    this.leadsRMQInstance = this.leadsProxyRMQ.getLeadsInstance()
  }

  async createLead(data: CreateLeadDTO): Promise<void> {
    // Should return an error if there is no emial and phone
    if (!data.email && !data.phone) {
      throw new BadRequestException("É necessário informar pelo menos um email ou um número de telefone.")
    }

    try {
      const msg = new RmqRecordBuilder(data)
      .setOptions({
        persistent: true,
      })
      .build();
      await lastValueFrom(this.leadsRMQInstance.emit('create-lead', msg));
    } catch (error) {
      this.logger.error('Erro ao enviar mensagem para a fila:', error.stack);
    }
  }

  async onModuleInit() {
    try {
      this.logger.log('Testando conexão com RabbitMQ...');
      await this.leadsRMQInstance.connect()
      this.logger.log('Conectado ao RabbitMQ com sucesso!');
    } catch (err) {
      this.logger.error('Erro ao conectar no RabbitMQ', err.message || err);
      process.exit(1); 
    }
}
}
