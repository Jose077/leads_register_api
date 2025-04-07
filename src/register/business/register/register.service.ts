import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { CreateLeadDTO } from '../../domain/dtos/create_lead.dto';
import { LeadsProxy } from 'src/common/proxyRMQ/leads-proxy';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RegisterService {
  private readonly logger = new Logger(RegisterService.name);
  private  leadsRMQInstance: ClientProxy

  constructor(private readonly leadsProxyRMQ: LeadsProxy) {
    this.leadsRMQInstance = this.leadsProxyRMQ.getLeadsInstance()
  }

  async createLead(data: CreateLeadDTO): Promise<void> {
    try {
      await lastValueFrom(this.leadsRMQInstance.emit('leads_queue', data));
      this.logger.log('Mensagem enviada com sucesso!');
    } catch (error) {
      this.logger.error('Erro ao enviar mensagem para a fila:', error.stack);
    }
  }
}
