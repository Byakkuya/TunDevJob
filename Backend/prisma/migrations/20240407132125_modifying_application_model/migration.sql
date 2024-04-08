/*
  Warnings:

  - You are about to drop the column `status` on the `Application` table. All the data in the column will be lost.
  - Added the required column `Name` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentPostition` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `github` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkedin` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resume` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Made the column `coverLetter` on table `Application` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "status",
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "currentPostition" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "github" TEXT NOT NULL,
ADD COLUMN     "linkedin" TEXT NOT NULL,
ADD COLUMN     "profile" TEXT NOT NULL,
ADD COLUMN     "resume" TEXT NOT NULL,
ALTER COLUMN "coverLetter" SET NOT NULL;
