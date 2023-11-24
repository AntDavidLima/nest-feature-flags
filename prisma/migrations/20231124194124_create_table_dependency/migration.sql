-- CreateTable
CREATE TABLE "Dependency" (
    "dependencyId" BIGINT NOT NULL,
    "dependentId" BIGINT NOT NULL,

    CONSTRAINT "Dependency_pkey" PRIMARY KEY ("dependencyId","dependentId")
);

-- AddForeignKey
ALTER TABLE "Dependency" ADD CONSTRAINT "Dependency_dependencyId_fkey" FOREIGN KEY ("dependencyId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dependency" ADD CONSTRAINT "Dependency_dependentId_fkey" FOREIGN KEY ("dependentId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
