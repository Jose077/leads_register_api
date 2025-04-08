import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { lastValueFrom, timeout, catchError, throwError, of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { LeadsProxy } from '../proxy/leads';

@Injectable()
export class TestInitRMQ implements OnModuleInit {
  private readonly logger = new Logger(TestInitRMQ.name);
  private leadsRMQ: ClientProxy
  
  constructor(private readonly leadsProxy: LeadsProxy) {
      this.leadsRMQ = this.leadsProxy.getLeadsInstance();
  }

  async onModuleInit() {
    try {
      this.logger.log('Testando conexão com RabbitMQ...');

      await lastValueFrom(
        this.leadsRMQ
          .emit('lead_test', {test: 'test'})
          .pipe(timeout(5000))
        );

      this.logger.log('Conectado ao RabbitMQ com sucesso!');
    } catch (err) {
      this.logger.error('Erro ao conectar no RabbitMQ', err.message || err);
      process.exit(1); 
    }
  }
}