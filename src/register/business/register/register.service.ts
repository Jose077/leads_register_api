import { BadGatewayException, BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateLeadDTO } from '../../domain/dtos/create_lead';
import { ClientProxy } from '@nestjs/microservices';
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
      await lastValueFrom(this.leadsRMQInstance.emit('leads_queue', data));
    } catch (error) {
      this.logger.error('Erro ao enviar mensagem para a fila:', error.stack);
    }
  }
}
