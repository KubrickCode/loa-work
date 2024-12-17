/*
  Warnings:

  - Added the required column `image_url` to the `content_category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "content_category" ADD COLUMN     "image_url" TEXT NOT NULL;
