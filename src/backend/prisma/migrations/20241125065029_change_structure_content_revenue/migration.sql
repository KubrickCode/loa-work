/*
  Warnings:

  - You are about to drop the column `auction_item_id` on the `content_revenue` table. All the data in the column will be lost.
  - You are about to drop the column `extra_item_id` on the `content_revenue` table. All the data in the column will be lost.
  - You are about to drop the column `market_item_id` on the `content_revenue` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[item_name]` on the table `content_revenue` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `item_name` to the `content_revenue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "content_revenue" DROP CONSTRAINT "content_revenue_auction_item_id_fkey";

-- DropForeignKey
ALTER TABLE "content_revenue" DROP CONSTRAINT "content_revenue_extra_item_id_fkey";

-- DropForeignKey
ALTER TABLE "content_revenue" DROP CONSTRAINT "content_revenue_market_item_id_fkey";

-- AlterTable
ALTER TABLE "content_revenue" DROP COLUMN "auction_item_id",
DROP COLUMN "extra_item_id",
DROP COLUMN "market_item_id",
ADD COLUMN     "item_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "content_revenue_item_name_key" ON "content_revenue"("item_name");
