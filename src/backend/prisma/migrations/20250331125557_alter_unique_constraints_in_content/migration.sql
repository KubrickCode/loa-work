/*
  Warnings:

  - A unique constraint covering the columns `[name,gate]` on the table `content` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "content_name_content_category_id_gate_key";

-- CreateIndex
CREATE UNIQUE INDEX "content_name_gate_key" ON "content"("name", "gate");
