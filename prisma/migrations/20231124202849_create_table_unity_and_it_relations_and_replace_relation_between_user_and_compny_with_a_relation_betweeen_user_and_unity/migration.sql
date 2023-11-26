/*
  Warnings:

  - You are about to drop the column `companyId` on the `User` table. All the data in the column will be lost.
  - Added the required column `unityId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "companyId",
ADD COLUMN     "unityId" BIGINT NOT NULL;

-- CreateTable
CREATE TABLE "Unity" (
    "id" BIGSERIAL NOT NULL,
    "companyId" BIGINT NOT NULL,

    CONSTRAINT "Unity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnityCompanyFeature" (
    "unityId" BIGINT NOT NULL,
    "companyFeatureFeatureId" BIGINT NOT NULL,
    "companyFeatureCompanyId" BIGINT NOT NULL,

    CONSTRAINT "UnityCompanyFeature_pkey" PRIMARY KEY ("unityId","companyFeatureFeatureId","companyFeatureCompanyId")
);

-- AddForeignKey
ALTER TABLE "Unity" ADD CONSTRAINT "Unity_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_unityId_fkey" FOREIGN KEY ("unityId") REFERENCES "Unity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnityCompanyFeature" ADD CONSTRAINT "UnityCompanyFeature_unityId_fkey" FOREIGN KEY ("unityId") REFERENCES "Unity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnityCompanyFeature" ADD CONSTRAINT "UnityCompanyFeature_companyFeatureFeatureId_companyFeature_fkey" FOREIGN KEY ("companyFeatureFeatureId", "companyFeatureCompanyId") REFERENCES "CompanyFeature"("featureId", "companyId") ON DELETE RESTRICT ON UPDATE CASCADE;
