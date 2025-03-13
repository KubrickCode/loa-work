/*
  Warnings:

  - You are about to drop the `content_reward_item_price` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "content_reward_item_price" DROP CONSTRAINT "content_reward_item_price_content_reward_item_id_fkey";

-- AlterTable
ALTER TABLE "content_reward_item" ADD COLUMN     "price" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "content_reward_item_price";
