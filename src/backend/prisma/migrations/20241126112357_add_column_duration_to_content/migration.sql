/*
  Warnings:

  - Added the required column `duration` to the `content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "content" ADD COLUMN     "duration" INTEGER NOT NULL;
