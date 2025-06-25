-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('ACTIVE', 'ARCHIVED');

-- AlterTable
ALTER TABLE "content" ADD COLUMN     "status" "ContentStatus" NOT NULL DEFAULT 'ACTIVE';
