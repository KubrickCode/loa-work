-- AlterTable
ALTER TABLE "auction_item" ADD COLUMN     "avg_buy_price" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "market_item" ADD COLUMN     "current_min_price" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "recent_price" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "y_day_avg_price" DECIMAL(65,30) NOT NULL DEFAULT 0;
