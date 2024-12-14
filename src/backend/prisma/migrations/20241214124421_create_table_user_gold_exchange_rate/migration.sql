-- CreateTable
CREATE TABLE "user_gold_exchange_rate" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "krw_amount" INTEGER NOT NULL,
    "gold_amount" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_gold_exchange_rate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_gold_exchange_rate_user_id_key" ON "user_gold_exchange_rate"("user_id");

-- AddForeignKey
ALTER TABLE "user_gold_exchange_rate" ADD CONSTRAINT "user_gold_exchange_rate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
