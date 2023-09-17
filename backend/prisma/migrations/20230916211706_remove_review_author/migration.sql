/*
  Warnings:

  - You are about to drop the column `author_id` on the `Review` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_author_id_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "author_id";
