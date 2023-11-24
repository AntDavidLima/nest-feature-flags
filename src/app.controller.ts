import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index() {
    return { data: 'Homepage data' };
  }

  @Get('/feature1')
  firstFeature() {
    return { data: 'Feature 1 data' };
  }

  @Get('/feature2')
  secondFeature() {
    return { data: 'Feature 2 data' };
  }

  @Get('/feature3')
  thirdFeature() {
    return { data: 'Feature 3 data' };
  }
}
