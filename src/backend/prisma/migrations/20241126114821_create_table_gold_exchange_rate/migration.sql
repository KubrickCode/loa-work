-- CreateTable
CREATE TABLE "gold_exchange_rate" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "krw_amount" INTEGER NOT NULL,
    "gold_amount" INTEGER NOT NULL,

    CONSTRAINT "gold_exchange_rate_pkey" PRIMARY KEY ("id")
);
