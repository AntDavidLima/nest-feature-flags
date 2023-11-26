import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { FeatureService } from './feature/feature.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService, FeatureService],
})
export class AppModule { }
