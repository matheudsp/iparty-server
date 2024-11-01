/*
  Warnings:

  - You are about to drop the column `link` on the `Party` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Party` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Party` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Party_link_key";

-- AlterTable
ALTER TABLE "Party" DROP COLUMN "link",
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Party_slug_key" ON "Party"("slug");
