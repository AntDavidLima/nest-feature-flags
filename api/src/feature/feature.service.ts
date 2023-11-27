import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Features } from './feature.interface';

@Injectable()
export class FeatureService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserFeatures(userId: bigint) {
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

    const features = userUnityFeatures.UnityCompanyFeature.map(
      (feature) => feature.companyFeature.feature.name,
    );

    return features;
  }

  async userHasFeature(userId: bigint, featureName: Features) {
    const unityFeatures = await this.getUserFeatures(userId);

    const feature = unityFeatures.filter(
      (unityFeature) => unityFeature === featureName,
    );

    const unityHasFeature = feature.length > 0;

    return unityHasFeature;
  }
}
