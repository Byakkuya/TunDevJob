/*
  Warnings:

  - You are about to drop the column `email` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Developer` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Developer` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Developer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Developer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullAddress` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Resume` to the `Developer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Developer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentPosition` to the `Developer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullAddress` to the `Developer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `github` to the `Developer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkedin` to the `Developer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Developer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicture` to the `Developer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Developer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `Developer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ADMIN';

-- DropIndex
DROP INDEX "Company_email_key";

-- DropIndex
DROP INDEX "Developer_email_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "email",
DROP COLUMN "password",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "fullAddress" TEXT NOT NULL,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "zipcode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Developer" DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "skills",
ADD COLUMN     "Resume" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "currentPosition" TEXT NOT NULL,
ADD COLUMN     "fullAddress" TEXT NOT NULL,
ADD COLUMN     "github" TEXT NOT NULL,
ADD COLUMN     "linkedin" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "profilePicture" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "zipcode" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "testimonialId" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_key" ON "Company"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Developer_userId_key" ON "Developer"("userId");

-- AddForeignKey
ALTER TABLE "Developer" ADD CONSTRAINT "Developer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_testimonialId_fkey" FOREIGN KEY ("testimonialId") REFERENCES "Testimonial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
