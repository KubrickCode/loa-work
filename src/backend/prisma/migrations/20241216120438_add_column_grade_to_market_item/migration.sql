/*
  Warnings:

  - A unique constraint covering the columns `[name,grade]` on the table `market_item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `grade` to the `market_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "market_item" ADD COLUMN     "grade" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "market_item_name_grade_key" ON "market_item"("name", "grade");
