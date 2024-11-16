-- CreateTable
CREATE TABLE "MinimumWage" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "year" INTEGER NOT NULL,
    "wage" INTEGER NOT NULL,

    CONSTRAINT "MinimumWage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MinimumWage_year_key" ON "MinimumWage"("year");
