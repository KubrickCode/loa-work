/*
  Warnings:

  - You are about to drop the column `category_id` on the `market_item` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `market_item_category_id` to the `market_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "market_item" DROP CONSTRAINT "market_item_category_id_fkey";

-- AlterTable
ALTER TABLE "market_item" DROP COLUMN "category_id",
ADD COLUMN     "market_item_category_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "category";

-- CreateTable
CREATE TABLE "market_item_category" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "market_item_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "market_item_category_code_key" ON "market_item_category"("code");

-- AddForeignKey
ALTER TABLE "market_item" ADD CONSTRAINT "market_item_market_item_category_id_fkey" FOREIGN KEY ("market_item_category_id") REFERENCES "market_item_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
