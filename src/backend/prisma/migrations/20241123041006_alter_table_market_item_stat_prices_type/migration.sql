/*
  Warnings:

  - You are about to alter the column `current_min_price` on the `market_item_stat` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `recent_price` on the `market_item_stat` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "market_item_stat" ALTER COLUMN "current_min_price" SET DATA TYPE INTEGER,
ALTER COLUMN "recent_price" SET DATA TYPE INTEGER;
