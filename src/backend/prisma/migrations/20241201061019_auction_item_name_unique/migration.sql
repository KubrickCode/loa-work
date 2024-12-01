/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `auction_item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "auction_item_name_key" ON "auction_item"("name");
