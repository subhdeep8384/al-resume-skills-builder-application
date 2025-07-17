/*
  Warnings:

  - The values [HIGH,MEDIUM,LOW] on the enum `DemandLevel` will be removed. If these variants are still used in the database, this will fail.
  - The values [POSITIVE,NEGATIVE,NEUTRAL] on the enum `MarketOutlook` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[industry]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DemandLevel_new" AS ENUM ('high', 'medium', 'low');
ALTER TABLE "IndustryInsight" ALTER COLUMN "demandLevel" TYPE "DemandLevel_new" USING ("demandLevel"::text::"DemandLevel_new");
ALTER TYPE "DemandLevel" RENAME TO "DemandLevel_old";
ALTER TYPE "DemandLevel_new" RENAME TO "DemandLevel";
DROP TYPE "DemandLevel_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "MarketOutlook_new" AS ENUM ('positive', 'negative', 'neutral');
ALTER TABLE "IndustryInsight" ALTER COLUMN "marketOutlook" TYPE "MarketOutlook_new" USING ("marketOutlook"::text::"MarketOutlook_new");
ALTER TYPE "MarketOutlook" RENAME TO "MarketOutlook_old";
ALTER TYPE "MarketOutlook_new" RENAME TO "MarketOutlook";
DROP TYPE "MarketOutlook_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "User_industry_key" ON "User"("industry");
