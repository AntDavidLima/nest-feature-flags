import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { FeatureGuard } from './feature.guard';
import { Features } from './feature.interface';

export const Feature = (feature: Features) => {
  return applyDecorators(
    SetMetadata('feature', feature),
    UseGuards(FeatureGuard),
  );
};
