/*
  Warnings:

  - You are about to drop the `market_item_price` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "market_item_price" DROP CONSTRAINT "market_item_price_market_item_id_fkey";

-- DropTable
DROP TABLE "market_item_price";

-- CreateTable
CREATE TABLE "market_item_stat" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "current_min_price" DECIMAL(65,30) NOT NULL,
    "recent_price" DECIMAL(65,30) NOT NULL,
    "scraped_at" TIMESTAMPTZ(6) NOT NULL,
    "y_day_avg_price" DECIMAL(65,30) NOT NULL,
    "market_item_id" INTEGER NOT NULL,

    CONSTRAINT "market_item_stat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "market_item_stat" ADD CONSTRAINT "market_item_stat_market_item_id_fkey" FOREIGN KEY ("market_item_id") REFERENCES "market_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
