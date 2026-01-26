import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private client: PrismaClient | null = null;

  private getClient(): PrismaClient {
    if (!this.client) {
      // Prisma 7 requires datasource URL to be passed via environment
      // The prisma.config.ts handles loading from .env
      this.client = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
      });
    }
    return this.client;
  }

  get user() {
    return this.getClient().user;
  }

  get service() {
    return this.getClient().service;
  }

  get booking() {
    return this.getClient().booking;
  }

  get payment() {
    return this.getClient().payment;
  }

  async onModuleInit() {
    try {
      await this.getClient().$connect();
      this.logger.log('Successfully connected to database');
    } catch (error) {
      this.logger.warn('Database connection failed - running without database');
      // Don't throw - allow app to start without DB for development
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.$disconnect();
    }
  }
}
