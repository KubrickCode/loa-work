/*
  Warnings:

  - You are about to drop the column `is_see_more` on the `content` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,content_category_id,gate]` on the table `content` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "content_name_content_category_id_gate_is_see_more_key";

-- AlterTable
ALTER TABLE "content" DROP COLUMN "is_see_more";

-- CreateTable
CREATE TABLE "content_see_more_reward" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "content_id" INTEGER NOT NULL,
    "content_reward_item_id" INTEGER NOT NULL,

    CONSTRAINT "content_see_more_reward_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "content_name_content_category_id_gate_key" ON "content"("name", "content_category_id", "gate");

-- AddForeignKey
ALTER TABLE "content_see_more_reward" ADD CONSTRAINT "content_see_more_reward_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_see_more_reward" ADD CONSTRAINT "content_see_more_reward_content_reward_item_id_fkey" FOREIGN KEY ("content_reward_item_id") REFERENCES "content_reward_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
