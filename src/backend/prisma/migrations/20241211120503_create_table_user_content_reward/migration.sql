/*
  Warnings:

  - You are about to drop the column `average_quantity` on the `content_reward` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `content_reward` table. All the data in the column will be lost.
  - You are about to drop the column `defaultPrice` on the `content_reward_item` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[content_id,contentRewardItemId]` on the table `content_reward` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `default_average_quantity` to the `content_reward` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "content_reward" DROP CONSTRAINT "content_reward_user_id_fkey";

-- DropIndex
DROP INDEX "content_reward_user_id_content_id_contentRewardItemId_key";

-- AlterTable
ALTER TABLE "content_reward" DROP COLUMN "average_quantity",
DROP COLUMN "user_id",
ADD COLUMN     "default_average_quantity" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "content_reward_item" DROP COLUMN "defaultPrice",
ADD COLUMN     "default_price" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "user_content_reward" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "average_quantity" DECIMAL(65,30) NOT NULL,
    "contentRewardId" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_content_reward_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_content_reward_user_id_contentRewardId_key" ON "user_content_reward"("user_id", "contentRewardId");

-- CreateIndex
CREATE UNIQUE INDEX "content_reward_content_id_contentRewardItemId_key" ON "content_reward"("content_id", "contentRewardItemId");

-- AddForeignKey
ALTER TABLE "user_content_reward" ADD CONSTRAINT "user_content_reward_contentRewardId_fkey" FOREIGN KEY ("contentRewardId") REFERENCES "content_reward"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_content_reward" ADD CONSTRAINT "user_content_reward_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
