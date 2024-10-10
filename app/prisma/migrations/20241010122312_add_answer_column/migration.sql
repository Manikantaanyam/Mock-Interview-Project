/*
  Warnings:

  - You are about to drop the column `text` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "text",
ADD COLUMN     "answer" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "question" TEXT NOT NULL DEFAULT '';
