import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterService } from '../../business/register/register.service';
import { CreateLeadDTO } from '../../domain/dtos/create_lead';

@Controller('leads')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async createLead(@Body() createLead: CreateLeadDTO): Promise<void> {
    await this.registerService.createLead(createLead);
  }
}
