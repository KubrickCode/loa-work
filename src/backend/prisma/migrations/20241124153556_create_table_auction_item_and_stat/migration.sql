-- CreateTable
CREATE TABLE "auction_item" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "name" TEXT NOT NULL,
    "image_src" TEXT NOT NULL,
    "is_stat_scraper_enabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "auction_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auction_item_stat" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "buy_price" INTEGER NOT NULL,
    "bid_price" INTEGER NOT NULL,
    "bid_start_price" INTEGER NOT NULL,
    "start_price" INTEGER NOT NULL,
    "is_competitive" BOOLEAN NOT NULL DEFAULT false,
    "end_date" TIMESTAMP(3) NOT NULL,
    "auction_item_id" INTEGER NOT NULL,

    CONSTRAINT "auction_item_stat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "auction_item_stat" ADD CONSTRAINT "auction_item_stat_auction_item_id_fkey" FOREIGN KEY ("auction_item_id") REFERENCES "auction_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
