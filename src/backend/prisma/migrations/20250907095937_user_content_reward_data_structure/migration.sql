/*
  Warnings:

  - You are about to drop the column `default_average_quantity` on the `content_reward` table. All the data in the column will be lost.
  - You are about to drop the column `content_reward_id` on the `user_content_reward` table. All the data in the column will be lost.
  - You are about to drop the column `is_edited` on the `user_content_reward` table. All the data in the column will be lost.
  - You are about to drop the column `content_see_more_reward_id` on the `user_content_see_more_reward` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,content_id,item_id]` on the table `user_content_reward` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,content_id,item_id]` on the table `user_content_see_more_reward` will be added. If there are existing duplicate values, this will fail.

*/

ALTER TABLE "content_reward" 
RENAME COLUMN "default_average_quantity" TO "average_quantity";

ALTER TABLE "user_content_reward" 
ADD COLUMN "content_id" INTEGER,
ADD COLUMN "item_id" INTEGER;

ALTER TABLE "user_content_see_more_reward" 
ADD COLUMN "content_id" INTEGER,
ADD COLUMN "item_id" INTEGER;

UPDATE "user_content_reward" 
SET "content_id" = cr."content_id",
    "item_id" = cr."item_id"
FROM "content_reward" cr 
WHERE "user_content_reward"."content_reward_id" = cr."id";

UPDATE "user_content_see_more_reward" 
SET "content_id" = csmr."content_id",
    "item_id" = csmr."item_id"
FROM "content_see_more_reward" csmr 
WHERE "user_content_see_more_reward"."content_see_more_reward_id" = csmr."id";

ALTER TABLE "user_content_reward" 
ALTER COLUMN "content_id" SET NOT NULL,
ALTER COLUMN "item_id" SET NOT NULL;

ALTER TABLE "user_content_see_more_reward" 
ALTER COLUMN "content_id" SET NOT NULL,
ALTER COLUMN "item_id" SET NOT NULL;

ALTER TABLE "user_content_reward" DROP CONSTRAINT "user_content_reward_content_reward_id_fkey";
ALTER TABLE "user_content_see_more_reward" DROP CONSTRAINT "user_content_see_more_reward_content_see_more_reward_id_fkey";

DROP INDEX "user_content_reward_user_id_content_reward_id_key";
DROP INDEX "user_content_see_more_reward_user_id_content_see_more_rewar_key";

ALTER TABLE "user_content_reward" 
DROP COLUMN "content_reward_id",
DROP COLUMN "is_edited";

ALTER TABLE "user_content_see_more_reward" 
DROP COLUMN "content_see_more_reward_id",
DROP COLUMN "is_edited";

CREATE UNIQUE INDEX "user_content_reward_user_id_content_id_item_id_key" ON "user_content_reward"("user_id", "content_id", "item_id");
CREATE UNIQUE INDEX "user_content_see_more_reward_user_id_content_id_item_id_key" ON "user_content_see_more_reward"("user_id", "content_id", "item_id");
CREATE UNIQUE INDEX "content_see_more_reward_content_id_item_id_key" ON "content_see_more_reward"("content_id", "item_id");


ALTER TABLE "user_content_reward" ADD CONSTRAINT "user_content_reward_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_content_reward" ADD CONSTRAINT "user_content_reward_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_content_see_more_reward" ADD CONSTRAINT "user_content_see_more_reward_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_content_see_more_reward" ADD CONSTRAINT "user_content_see_more_reward_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
