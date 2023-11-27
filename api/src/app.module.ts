import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { FeatureModule } from './feature/feature.module';

@Module({
  imports: [FeatureModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
