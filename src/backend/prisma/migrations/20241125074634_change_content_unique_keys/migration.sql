/*
  Warnings:

  - A unique constraint covering the columns `[name,type,gate,is_see_more]` on the table `content` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "content_name_key";

-- AlterTable
ALTER TABLE "content" ADD COLUMN     "gate" INTEGER,
ADD COLUMN     "is_see_more" BOOLEAN;

-- CreateIndex
CREATE UNIQUE INDEX "content_name_type_gate_is_see_more_key" ON "content"("name", "type", "gate", "is_see_more");
