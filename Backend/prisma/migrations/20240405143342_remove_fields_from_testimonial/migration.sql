/*
  Warnings:

  - You are about to drop the column `developerName` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `developerProfilePicture` on the `Testimonial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "developerName",
DROP COLUMN "developerProfilePicture";
