/*
  Warnings:

  - You are about to drop the column `scraped_at` on the `market_item_stat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "market_item_stat" DROP COLUMN "scraped_at";
