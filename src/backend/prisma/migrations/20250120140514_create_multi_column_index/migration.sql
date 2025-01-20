-- DropIndex
DROP INDEX "auction_item_stat_auction_item_id_idx";

-- DropIndex
DROP INDEX "market_item_stat_market_item_id_idx";

-- CreateIndex
CREATE INDEX "auction_item_stat_auction_item_id_created_at_idx" ON "auction_item_stat"("auction_item_id", "created_at");

-- CreateIndex
CREATE INDEX "market_item_stat_market_item_id_created_at_idx" ON "market_item_stat"("market_item_id", "created_at");
