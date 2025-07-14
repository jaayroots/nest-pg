/*
  Warnings:

  - Made the column `createdBy` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedBy` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedBy" TEXT,
ALTER COLUMN "createdBy" SET NOT NULL,
ALTER COLUMN "updatedBy" SET NOT NULL;
