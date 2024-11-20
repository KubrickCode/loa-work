-- CreateTable
CREATE TABLE "market_item" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "bundle_count" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image_src" TEXT NOT NULL,
    "ref_id" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "market_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "market_item_price" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "current_min_price" DECIMAL(65,30) NOT NULL,
    "recent_price" DECIMAL(65,30) NOT NULL,
    "scraped_at" TIMESTAMPTZ(6) NOT NULL,
    "y_day_avg_price" DECIMAL(65,30) NOT NULL,
    "market_item_id" INTEGER NOT NULL,

    CONSTRAINT "market_item_price_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "market_item_ref_id_key" ON "market_item"("ref_id");

-- AddForeignKey
ALTER TABLE "market_item" ADD CONSTRAINT "market_item_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "market_item_price" ADD CONSTRAINT "market_item_price_market_item_id_fkey" FOREIGN KEY ("market_item_id") REFERENCES "market_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
