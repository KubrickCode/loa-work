/*
  Warnings:

  - You are about to drop the column `content_duration_id` on the `user_content_duration` table. All the data in the column will be lost.
  - You are about to drop the column `is_edited` on the `user_content_duration` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[content_id,user_id]` on the table `user_content_duration` will be added. If there are existing duplicate values, this will fail.

*/

ALTER TABLE "content_duration" RENAME COLUMN "default_value" TO "value";

ALTER TABLE "user_content_duration" ADD COLUMN "content_id" INTEGER;

UPDATE "user_content_duration" 
SET "content_id" = cd."content_id"
FROM "content_duration" cd 
WHERE "user_content_duration"."content_duration_id" = cd."id";

ALTER TABLE "user_content_duration" 
ALTER COLUMN "content_id" SET NOT NULL;

ALTER TABLE "user_content_duration" DROP CONSTRAINT "user_content_duration_content_duration_id_fkey";
DROP INDEX "user_content_duration_content_duration_id_user_id_key";

ALTER TABLE "user_content_duration" 
DROP COLUMN "content_duration_id",
DROP COLUMN "is_edited";

CREATE UNIQUE INDEX "user_content_duration_content_id_user_id_key" ON "user_content_duration"("content_id", "user_id");

ALTER TABLE "user_content_duration" ADD CONSTRAINT "user_content_duration_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
