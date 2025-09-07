/*
  Warnings:

  - You are about to drop the column `content_duration_id` on the `user_content_duration` table. All the data in the column will be lost.
  - You are about to drop the column `is_edited` on the `user_content_duration` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[content_id,user_id]` on the table `user_content_duration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content_id` to the `user_content_duration` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_content_duration" DROP CONSTRAINT "user_content_duration_content_duration_id_fkey";

-- DropIndex
DROP INDEX "user_content_duration_content_duration_id_user_id_key";

-- AlterTable
ALTER TABLE "content_duration" RENAME COLUMN "default_value" TO "value";

-- AlterTable
ALTER TABLE "user_content_duration" DROP COLUMN "content_duration_id",
DROP COLUMN "is_edited",
ADD COLUMN     "content_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_content_duration_content_id_user_id_key" ON "user_content_duration"("content_id", "user_id");

-- AddForeignKey
ALTER TABLE "user_content_duration" ADD CONSTRAINT "user_content_duration_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
