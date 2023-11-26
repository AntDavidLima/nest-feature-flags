import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Features } from './feature.interface';

@Injectable()
export class FeatureService {
  constructor(private readonly prismaService: PrismaService) { }

  async userHasFeature(userId: bigint, featureName: Features) {
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

    const feature = userUnityFeatures.UnityCompanyFeature.filter(
      (unityCompanyFeature) =>
        unityCompanyFeature.companyFeature.feature.name === featureName,
    );

    const unityHasFeature = feature.length > 0;

    return unityHasFeature;
  }
}
