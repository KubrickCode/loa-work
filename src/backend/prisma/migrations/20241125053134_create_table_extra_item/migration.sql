-- AlterTable
ALTER TABLE "content_revenue" ADD COLUMN     "extra_item_id" INTEGER;

-- CreateTable
CREATE TABLE "extra_item" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "extra_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "extra_item_name_key" ON "extra_item"("name");

-- AddForeignKey
ALTER TABLE "content_revenue" ADD CONSTRAINT "content_revenue_extra_item_id_fkey" FOREIGN KEY ("extra_item_id") REFERENCES "extra_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
