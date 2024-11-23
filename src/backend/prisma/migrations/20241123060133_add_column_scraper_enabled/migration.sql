-- AlterTable
ALTER TABLE "market_item" ADD COLUMN     "is_stat_scraper_enabled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "market_item_category" ADD COLUMN     "is_item_scraper_enabled" BOOLEAN NOT NULL DEFAULT false;
