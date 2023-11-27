import { Controller, Get } from '@nestjs/common';
import { Feature } from './feature/feature.decorator';
import { Features } from './feature/feature.interface';

@Controller()
export class AppController {
  @Get()
  index() {
    return { data: 'Homepage data' };
  }

  @Get('feature1')
  @Feature(Features.FEATURE_1)
  firstFeature() {
    return { data: 'Feature 1 data' };
  }

  @Get('feature2')
  @Feature(Features.FEATURE_2)
  secondFeature() {
    return { data: 'Feature 2 data' };
  }

  @Get('feature3')
  @Feature(Features.FEATURE_3)
  thirdFeature() {
    return { data: 'Feature 3 data' };
  }
}
