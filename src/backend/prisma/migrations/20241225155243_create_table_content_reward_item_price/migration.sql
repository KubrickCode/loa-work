/*
  Warnings:

  - You are about to drop the column `default_price` on the `content_reward_item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "content_reward_item" DROP COLUMN "default_price";

-- CreateTable
CREATE TABLE "content_reward_item_price" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DECIMAL(65,30) NOT NULL,
    "content_reward_item_id" INTEGER NOT NULL,

    CONSTRAINT "content_reward_item_price_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "content_reward_item_price" ADD CONSTRAINT "content_reward_item_price_content_reward_item_id_fkey" FOREIGN KEY ("content_reward_item_id") REFERENCES "content_reward_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
