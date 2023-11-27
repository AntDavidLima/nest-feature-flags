import { Module } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { FeatureController } from './feature.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PrismaService, FeatureService],
  controllers: [FeatureController],
  exports: [FeatureService],
})
export class FeatureModule { }
