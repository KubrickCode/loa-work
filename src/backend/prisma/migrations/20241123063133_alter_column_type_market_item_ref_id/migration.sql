/*
  Warnings:

  - Changed the type of `ref_id` on the `market_item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "market_item" DROP COLUMN "ref_id",
ADD COLUMN     "ref_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "market_item_ref_id_key" ON "market_item"("ref_id");
