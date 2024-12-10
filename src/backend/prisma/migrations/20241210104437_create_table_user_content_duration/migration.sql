/*
  Warnings:

  - You are about to drop the column `user_id` on the `content_duration` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `content_duration` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[content_id]` on the table `content_duration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `defaultValue` to the `content_duration` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "content_duration" DROP CONSTRAINT "content_duration_user_id_fkey";

-- DropIndex
DROP INDEX "content_duration_content_id_user_id_key";

-- AlterTable
ALTER TABLE "content_duration" DROP COLUMN "user_id",
DROP COLUMN "value",
ADD COLUMN     "defaultValue" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "user_content_duration" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "value" INTEGER NOT NULL,
    "content_duration_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_content_duration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_content_duration_content_duration_id_user_id_key" ON "user_content_duration"("content_duration_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "content_duration_content_id_key" ON "content_duration"("content_id");

-- AddForeignKey
ALTER TABLE "user_content_duration" ADD CONSTRAINT "user_content_duration_content_duration_id_fkey" FOREIGN KEY ("content_duration_id") REFERENCES "content_duration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_content_duration" ADD CONSTRAINT "user_content_duration_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
