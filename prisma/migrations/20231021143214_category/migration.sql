/*
  Warnings:

  - Added the required column `catId` to the `dish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dish" ADD COLUMN     "catId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "dish" ADD CONSTRAINT "dish_catId_fkey" FOREIGN KEY ("catId") REFERENCES "category"("catId") ON DELETE RESTRICT ON UPDATE CASCADE;
