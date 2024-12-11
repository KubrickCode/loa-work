/*
  Warnings:

  - You are about to drop the column `defaultValue` on the `content_duration` table. All the data in the column will be lost.
  - You are about to drop the column `contentRewardItemId` on the `content_reward` table. All the data in the column will be lost.
  - You are about to drop the column `contentRewardId` on the `user_content_reward` table. All the data in the column will be lost.
  - You are about to drop the column `contentRewardItemId` on the `user_content_reward_item` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[content_id,content_reward_item_id]` on the table `content_reward` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,content_reward_id]` on the table `user_content_reward` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,content_reward_item_id]` on the table `user_content_reward_item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `default_value` to the `content_duration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_reward_item_id` to the `content_reward` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_reward_id` to the `user_content_reward` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_reward_item_id` to the `user_content_reward_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "content_reward" DROP CONSTRAINT "content_reward_contentRewardItemId_fkey";

-- DropForeignKey
ALTER TABLE "user_content_reward" DROP CONSTRAINT "user_content_reward_contentRewardId_fkey";

-- DropForeignKey
ALTER TABLE "user_content_reward_item" DROP CONSTRAINT "user_content_reward_item_contentRewardItemId_fkey";

-- DropIndex
DROP INDEX "content_reward_content_id_contentRewardItemId_key";

-- DropIndex
DROP INDEX "user_content_reward_user_id_contentRewardId_key";

-- DropIndex
DROP INDEX "user_content_reward_item_user_id_contentRewardItemId_key";

-- AlterTable
ALTER TABLE "content_duration" DROP COLUMN "defaultValue",
ADD COLUMN     "default_value" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "content_reward" DROP COLUMN "contentRewardItemId",
ADD COLUMN     "content_reward_item_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user_content_reward" DROP COLUMN "contentRewardId",
ADD COLUMN     "content_reward_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user_content_reward_item" DROP COLUMN "contentRewardItemId",
ADD COLUMN     "content_reward_item_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "content_reward_content_id_content_reward_item_id_key" ON "content_reward"("content_id", "content_reward_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_content_reward_user_id_content_reward_id_key" ON "user_content_reward"("user_id", "content_reward_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_content_reward_item_user_id_content_reward_item_id_key" ON "user_content_reward_item"("user_id", "content_reward_item_id");

-- AddForeignKey
ALTER TABLE "content_reward" ADD CONSTRAINT "content_reward_content_reward_item_id_fkey" FOREIGN KEY ("content_reward_item_id") REFERENCES "content_reward_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_content_reward" ADD CONSTRAINT "user_content_reward_content_reward_id_fkey" FOREIGN KEY ("content_reward_id") REFERENCES "content_reward"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_content_reward_item" ADD CONSTRAINT "user_content_reward_item_content_reward_item_id_fkey" FOREIGN KEY ("content_reward_item_id") REFERENCES "content_reward_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
