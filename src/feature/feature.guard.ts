import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeatureGuard implements CanActivate {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const userId = request.query.userId;

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        unity: true,
      },
    });

    const userUnityFeatures = await this.prismaService.unity.findUnique({
      where: { id: user.unity.id },
      include: {
        UnityCompanyFeature: {
          include: {
            companyFeature: {
              include: {
                feature: true,
              },
            },
          },
        },
      },
    });

    const featureName = this.reflector.get(
      'feature',
      context.getHandler() || context.getClass(),
    );

    const feature = userUnityFeatures.UnityCompanyFeature.filter(
      (unityCompanyFeature) =>
        unityCompanyFeature.companyFeature.feature.name === featureName,
    );

    const unityHasFeature = feature.length > 0;

    return unityHasFeature;
  }
}
