/*
  Warnings:

  - You are about to drop the column `type` on the `content` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,content_category_id,gate,is_see_more]` on the table `content` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content_category_id` to the `content` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "content_name_type_gate_is_see_more_key";

-- AlterTable
ALTER TABLE "content" DROP COLUMN "type",
ADD COLUMN     "content_category_id" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "ContentType";

-- CreateTable
CREATE TABLE "content_category" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "content_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "content_category_name_key" ON "content_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "content_name_content_category_id_gate_is_see_more_key" ON "content"("name", "content_category_id", "gate", "is_see_more");

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_content_category_id_fkey" FOREIGN KEY ("content_category_id") REFERENCES "content_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
