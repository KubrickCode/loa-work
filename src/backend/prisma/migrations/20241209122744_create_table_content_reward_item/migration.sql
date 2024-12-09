/*
  Warnings:

  - You are about to drop the column `item_name` on the `content_reward` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,content_id,contentRewardItemId]` on the table `content_reward` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contentRewardItemId` to the `content_reward` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContentRewardItemKind" AS ENUM ('AUCTION_ITEM', 'MARKET_ITEM', 'EXTRA_ITEM');

-- DropIndex
DROP INDEX "content_reward_user_id_content_id_item_name_key";

-- AlterTable
ALTER TABLE "content_reward" DROP COLUMN "item_name",
ADD COLUMN     "contentRewardItemId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "content_reward_item" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "kind" "ContentRewardItemKind" NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "content_reward_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "content_reward_item_name_key" ON "content_reward_item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "content_reward_user_id_content_id_contentRewardItemId_key" ON "content_reward"("user_id", "content_id", "contentRewardItemId");

-- AddForeignKey
ALTER TABLE "content_reward" ADD CONSTRAINT "content_reward_contentRewardItemId_fkey" FOREIGN KEY ("contentRewardItemId") REFERENCES "content_reward_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
