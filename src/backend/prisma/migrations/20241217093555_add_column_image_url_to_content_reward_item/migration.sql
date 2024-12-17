/*
  Warnings:

  - Added the required column `image_url` to the `content_reward_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "content_reward_item" ADD COLUMN     "image_url" TEXT NOT NULL;
