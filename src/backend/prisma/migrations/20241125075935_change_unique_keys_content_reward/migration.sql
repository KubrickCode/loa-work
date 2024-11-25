/*
  Warnings:

  - A unique constraint covering the columns `[content_id,item_name]` on the table `content_reward` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "content_reward_item_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "content_reward_content_id_item_name_key" ON "content_reward"("content_id", "item_name");
