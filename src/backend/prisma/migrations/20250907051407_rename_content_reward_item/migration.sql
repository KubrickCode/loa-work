/*
  Warnings:

  - You are about to drop the column `content_reward_item_id` on the `content_reward` table. All the data in the column will be lost.
  - You are about to drop the column `content_reward_item_id` on the `content_see_more_reward` table. All the data in the column will be lost.
  - You are about to drop the `content_reward_item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_content_reward_item` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[content_id,item_id]` on the table `content_reward` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `item_id` to the `content_reward` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_id` to the `content_see_more_reward` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemKind" AS ENUM ('AUCTION', 'MARKET', 'EXTRA');

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "image_url" TEXT NOT NULL,
    "is_editable" BOOLEAN NOT NULL DEFAULT false,
    "kind" "ItemKind" NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_item" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "item_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "item_name_key" ON "item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_item_user_id_item_id_key" ON "user_item"("user_id", "item_id");

-- DATA MIGRATION: content_reward_item 데이터를 item 테이블로 마이그레이션
INSERT INTO "item" ("id", "created_at", "updated_at", "image_url", "is_editable", "kind", "name", "price")
SELECT 
    "id",
    "created_at",
    "updated_at",
    "image_url",
    "is_editable",
    CASE 
        WHEN "kind" = 'AUCTION_ITEM' THEN 'AUCTION'::"ItemKind"
        WHEN "kind" = 'MARKET_ITEM' THEN 'MARKET'::"ItemKind"
        WHEN "kind" = 'EXTRA_ITEM' THEN 'EXTRA'::"ItemKind"
        ELSE 'EXTRA'::"ItemKind" -- 기본값
    END,
    "name",
    "price"
FROM "content_reward_item"
WHERE EXISTS (SELECT 1 FROM "content_reward_item");

-- DATA MIGRATION: user_content_reward_item 데이터를 user_item 테이블로 마이그레이션
INSERT INTO "user_item" ("created_at", "updated_at", "price", "item_id", "user_id")
SELECT DISTINCT
    ucri."created_at",
    ucri."updated_at",
    ucri."price",
    ucri."content_reward_item_id", -- 이는 이제 item.id와 매칭됨
    ucri."user_id"
FROM "user_content_reward_item" ucri
WHERE EXISTS (SELECT 1 FROM "user_content_reward_item")
ON CONFLICT ("user_id", "item_id") DO NOTHING; -- 중복 방지

-- DropForeignKey: 기존 외래키 제약조건 삭제
ALTER TABLE "content_reward" DROP CONSTRAINT "content_reward_content_reward_item_id_fkey";

-- DropForeignKey
ALTER TABLE "content_see_more_reward" DROP CONSTRAINT "content_see_more_reward_content_reward_item_id_fkey";

-- DropForeignKey
ALTER TABLE "user_content_reward_item" DROP CONSTRAINT "user_content_reward_item_content_reward_item_id_fkey";

-- DropForeignKey
ALTER TABLE "user_content_reward_item" DROP CONSTRAINT "user_content_reward_item_user_id_fkey";

-- DropIndex
DROP INDEX "content_reward_content_id_content_reward_item_id_key";

-- AlterTable: content_reward 테이블에 item_id 컬럼 추가 (임시로 nullable)
ALTER TABLE "content_reward" ADD COLUMN "item_id" INTEGER;

-- AlterTable: content_see_more_reward 테이블에 item_id 컬럼 추가 (임시로 nullable)
ALTER TABLE "content_see_more_reward" ADD COLUMN "item_id" INTEGER;

-- DATA MIGRATION: content_reward.item_id 설정
UPDATE "content_reward" 
SET "item_id" = "content_reward_item_id"
WHERE "content_reward_item_id" IS NOT NULL;

-- DATA MIGRATION: content_see_more_reward.item_id 설정
UPDATE "content_see_more_reward"
SET "item_id" = "content_reward_item_id"
WHERE "content_reward_item_id" IS NOT NULL;

-- AlterTable: item_id 컬럼을 NOT NULL로 변경
ALTER TABLE "content_reward" ALTER COLUMN "item_id" SET NOT NULL;

-- AlterTable: item_id 컬럼을 NOT NULL로 변경
ALTER TABLE "content_see_more_reward" ALTER COLUMN "item_id" SET NOT NULL;

-- AlterTable: 기존 content_reward_item_id 컬럼 삭제
ALTER TABLE "content_reward" DROP COLUMN "content_reward_item_id";

-- AlterTable: 기존 content_reward_item_id 컬럼 삭제
ALTER TABLE "content_see_more_reward" DROP COLUMN "content_reward_item_id";

-- DropTable: 기존 테이블 삭제
DROP TABLE "user_content_reward_item";

-- DropTable
DROP TABLE "content_reward_item";

-- DropEnum: 기존 enum 삭제
DROP TYPE "ContentRewardItemKind";

-- CreateIndex: 새로운 유니크 제약조건 생성
CREATE UNIQUE INDEX "content_reward_content_id_item_id_key" ON "content_reward"("content_id", "item_id");

-- AddForeignKey: 새로운 외래키 제약조건 추가
ALTER TABLE "content_reward" ADD CONSTRAINT "content_reward_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_see_more_reward" ADD CONSTRAINT "content_see_more_reward_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_item" ADD CONSTRAINT "user_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_item" ADD CONSTRAINT "user_item_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
