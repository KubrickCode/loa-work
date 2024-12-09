/*
  Warnings:

  - You are about to drop the column `duration` on the `content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "content" DROP COLUMN "duration";

-- CreateTable
CREATE TABLE "content_duration" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "value" INTEGER NOT NULL,
    "content_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "content_duration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "content_duration_content_id_user_id_key" ON "content_duration"("content_id", "user_id");

-- AddForeignKey
ALTER TABLE "content_duration" ADD CONSTRAINT "content_duration_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_duration" ADD CONSTRAINT "content_duration_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
