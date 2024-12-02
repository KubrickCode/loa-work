/*
  Warnings:

  - A unique constraint covering the columns `[user_id,content_id,item_name]` on the table `content_reward` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `content_reward` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "content_reward_content_id_item_name_key";

-- AlterTable
ALTER TABLE "content_reward" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "content_reward_user_id_content_id_item_name_key" ON "content_reward"("user_id", "content_id", "item_name");

-- AddForeignKey
ALTER TABLE "content_reward" ADD CONSTRAINT "content_reward_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
