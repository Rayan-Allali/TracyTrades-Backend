/*
  Warnings:

  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "category" DROP CONSTRAINT "category_pkey",
DROP COLUMN "id",
ADD COLUMN     "catId" SERIAL NOT NULL,
ADD CONSTRAINT "category_pkey" PRIMARY KEY ("catId");

-- CreateTable
CREATE TABLE "ingredient" (
    "ingrId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unitM" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,

    CONSTRAINT "ingredient_pkey" PRIMARY KEY ("ingrId")
);

-- CreateTable
CREATE TABLE "dishIngredient" (
    "dishIngredientId" SERIAL NOT NULL,
    "ingrId" INTEGER NOT NULL,
    "dishId" INTEGER NOT NULL,
    "qte" TEXT NOT NULL,

    CONSTRAINT "dishIngredient_pkey" PRIMARY KEY ("dishIngredientId")
);

-- CreateTable
CREATE TABLE "dish" (
    "dishId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cookingTime" INTEGER NOT NULL,
    "imgUrl" TEXT,

    CONSTRAINT "dish_pkey" PRIMARY KEY ("dishId")
);

-- AddForeignKey
ALTER TABLE "dishIngredient" ADD CONSTRAINT "dishIngredient_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "dish"("dishId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dishIngredient" ADD CONSTRAINT "dishIngredient_ingrId_fkey" FOREIGN KEY ("ingrId") REFERENCES "ingredient"("ingrId") ON DELETE RESTRICT ON UPDATE CASCADE;
