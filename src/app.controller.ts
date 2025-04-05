import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateLeadDTO } from './dtos/create_lead.dto';

@Controller('leads')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createLead(@Body() createLead: CreateLeadDTO): Promise<void> {
    await this.appService.createLead(createLead);
  }
}
