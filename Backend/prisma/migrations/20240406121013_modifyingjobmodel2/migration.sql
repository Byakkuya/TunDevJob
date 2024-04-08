/*
  Warnings:

  - You are about to alter the column `salary` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `city` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractType` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobType` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "contractType" TEXT NOT NULL,
ADD COLUMN     "jobType" TEXT NOT NULL,
ALTER COLUMN "salary" SET DATA TYPE INTEGER;
