import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateLeadDTO } from './dtos/create_lead';

@Controller('leads')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async createLead(@Body() createLead: CreateLeadDTO): Promise<void> {
    await this.registerService.createLead(createLead);
  }
}
