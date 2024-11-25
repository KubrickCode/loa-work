/*
  Warnings:

  - Added the required column `level` to the `content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "content" ADD COLUMN     "level" INTEGER NOT NULL;
