import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';
import { FeatureService } from './feature.service';

@Injectable()
export class FeatureGuard implements CanActivate {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly reflector: Reflector,
    private readonly featureService: FeatureService,
  ) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const userId = request.query.userId;

    const featureName = this.reflector.get(
      'feature/featureName',
      context.getHandler() || context.getClass(),
    );

    return this.featureService.userHasFeature(userId, featureName);
  }
}
