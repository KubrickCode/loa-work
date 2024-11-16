/*
  Warnings:

  - You are about to drop the `MinimumWage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "MinimumWage";

-- CreateTable
CREATE TABLE "minimum_wage" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "year" INTEGER NOT NULL,
    "wage" INTEGER NOT NULL,

    CONSTRAINT "minimum_wage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "minimum_wage_year_key" ON "minimum_wage"("year");
