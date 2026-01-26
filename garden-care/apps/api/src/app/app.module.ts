import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma';
import { BlogsModule } from '../modules/blogs';

@Module({
  imports: [PrismaModule, BlogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
