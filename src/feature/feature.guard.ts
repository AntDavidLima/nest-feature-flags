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
        company: true,
      },
    });

    const userCompanyFeatures = await this.prismaService.company.findUnique({
      where: { id: user.company.id },
      include: {
        CompanyFeature: {
          include: {
            feature: true,
          },
        },
      },
    });

    const featureName = this.reflector.get(
      'feature',
      context.getHandler() || context.getClass(),
    );

    const feature = userCompanyFeatures.CompanyFeature.filter(
      (companyFeature) => companyFeature.feature.name === featureName,
    );

    const companyHasFeature = feature.length > 0;

    return companyHasFeature;
  }
}
