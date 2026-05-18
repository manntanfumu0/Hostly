/*
  Warnings:

  - You are about to drop the column `status` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "status",
ADD COLUMN     "deploy_status" TEXT NOT NULL DEFAULT 'deploying',
ADD COLUMN     "domain" TEXT,
ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "framework" DROP NOT NULL;
