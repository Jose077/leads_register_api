import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { CreateLeadDTO } from './dtos/create_lead.dto';

@Injectable()
export class AppService {
  constructor(
    // private readonly 
  ) {}

  private readonly logger = new Logger(AppService.name);

  async createLead(data: CreateLeadDTO): Promise<void> {
    this.logger.warn(data)

    // todo: Should not add a lead with the same email

    // todo: Should not add a lead with the same phone number
    
  }

}
