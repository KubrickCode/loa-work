/*
  Warnings:

  - You are about to drop the column `price` on the `content_reward_item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "content_reward_item" DROP COLUMN "price",
ADD COLUMN     "defaultPrice" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "user_content_reward_item" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "contentRewardItemId" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_content_reward_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_content_reward_item_user_id_contentRewardItemId_key" ON "user_content_reward_item"("user_id", "contentRewardItemId");

-- AddForeignKey
ALTER TABLE "user_content_reward_item" ADD CONSTRAINT "user_content_reward_item_contentRewardItemId_fkey" FOREIGN KEY ("contentRewardItemId") REFERENCES "content_reward_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_content_reward_item" ADD CONSTRAINT "user_content_reward_item_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
