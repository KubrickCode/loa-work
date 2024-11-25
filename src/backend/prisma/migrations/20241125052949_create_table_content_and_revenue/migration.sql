-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('CUBE', 'EPIC_RAID', 'GUARDIAN_RAID', 'KURZAN_FRONT', 'KAZEROS_RAID', 'LEGION_COMMANDER_RAID');

-- CreateTable
CREATE TABLE "content" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ContentType" NOT NULL,

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_revenue" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "average_quantity" DECIMAL(65,30) NOT NULL,
    "content_id" INTEGER NOT NULL,
    "auction_item_id" INTEGER,
    "market_item_id" INTEGER,

    CONSTRAINT "content_revenue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "content_name_key" ON "content"("name");

-- AddForeignKey
ALTER TABLE "content_revenue" ADD CONSTRAINT "content_revenue_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_revenue" ADD CONSTRAINT "content_revenue_auction_item_id_fkey" FOREIGN KEY ("auction_item_id") REFERENCES "auction_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_revenue" ADD CONSTRAINT "content_revenue_market_item_id_fkey" FOREIGN KEY ("market_item_id") REFERENCES "market_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
