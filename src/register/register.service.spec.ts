import { Test, TestingModule } from '@nestjs/testing';
import { RegisterModule } from 'src/register/register.module';
import { RegisterService } from './register.service';
import { CreateLeadDTO } from 'src/register/dtos/create_lead';
import { BadRequestException } from '@nestjs/common';
import { LeadsProxy } from 'src/common/rabbitMQ/proxy/leads';

describe('Register', () => {
  let registerService: RegisterService;

  const mockLeadsProxy = {getLeadsInstance: jest.fn().mockResolvedValue(true)};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterService,
        {
          provide: LeadsProxy,
          useValue: mockLeadsProxy,
        }
      ],
    }).compile();

    registerService = module.get<RegisterService>(RegisterService);
  });

  it('should throw an error if the email and phone are missing', async () => {
    const lead: CreateLeadDTO = {
      name: "test"
    };

    await expect(registerService.createLead(lead)).rejects.toThrow(BadRequestException);
  });


});
