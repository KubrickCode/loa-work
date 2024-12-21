/*
  Warnings:

  - You are about to drop the column `image_src` on the `auction_item` table. All the data in the column will be lost.
  - You are about to drop the column `image_src` on the `market_item` table. All the data in the column will be lost.
  - Added the required column `image_url` to the `auction_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `market_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auction_item" DROP COLUMN "image_src",
ADD COLUMN     "image_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "market_item" DROP COLUMN "image_src",
ADD COLUMN     "image_url" TEXT NOT NULL;
