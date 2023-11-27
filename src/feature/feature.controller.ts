import { Controller, Get, Param } from '@nestjs/common';
import { FeatureService } from './feature.service';

@Controller('feature')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) { }

  @Get(':id')
  async show(@Param('id') id: bigint) {
    const userFeatures = await this.featureService.getUserFeatures(id);

    return { data: userFeatures };
  }
}
