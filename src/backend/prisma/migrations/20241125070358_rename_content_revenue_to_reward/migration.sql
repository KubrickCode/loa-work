/*
  Warnings:

  - You are about to drop the `content_revenue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "content_revenue" DROP CONSTRAINT "content_revenue_content_id_fkey";

-- DropTable
DROP TABLE "content_revenue";

-- CreateTable
CREATE TABLE "content_reward" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "average_quantity" DECIMAL(65,30) NOT NULL,
    "is_sellable" BOOLEAN NOT NULL DEFAULT false,
    "item_name" TEXT NOT NULL,
    "content_id" INTEGER NOT NULL,

    CONSTRAINT "content_reward_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "content_reward_item_name_key" ON "content_reward"("item_name");

-- AddForeignKey
ALTER TABLE "content_reward" ADD CONSTRAINT "content_reward_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
