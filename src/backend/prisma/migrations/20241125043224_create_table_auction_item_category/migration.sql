/*
  Warnings:

  - Added the required column `auction_item_category_id` to the `auction_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auction_item" ADD COLUMN     "auction_item_category_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "auction_item_category" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "code" INTEGER NOT NULL,
    "is_item_scraper_enabled" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,

    CONSTRAINT "auction_item_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auction_item_category_code_key" ON "auction_item_category"("code");

-- AddForeignKey
ALTER TABLE "auction_item" ADD CONSTRAINT "auction_item_auction_item_category_id_fkey" FOREIGN KEY ("auction_item_category_id") REFERENCES "auction_item_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
