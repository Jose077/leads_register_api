import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { CreateLeadDTO } from '../../domain/dtos/create_lead.dto';
import { LeadsProxy } from 'src/common/proxyRMQ/leads-proxy';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RegisterService {
  private readonly logger = new Logger(RegisterService.name);
  private  leadsRMQInstance: ClientProxy

  constructor(private readonly leadsProxyRMQ: LeadsProxy) {
    this.leadsRMQInstance = this.leadsProxyRMQ.getLeadsInstance()
  }


  async createLead(data: CreateLeadDTO): Promise<void> {
    this.logger.warn(data)
    this.logger.log(this.leadsRMQInstance.status)

    // todo: Should not add a lead with the same email

    // todo: Should not add a lead with the same phone number
    
  }

}
