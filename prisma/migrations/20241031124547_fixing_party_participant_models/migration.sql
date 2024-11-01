/*
  Warnings:

  - You are about to drop the column `amountPaid` on the `PartyParticipant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Party" ADD COLUMN     "valueForEachParcipant" DOUBLE PRECISION,
ALTER COLUMN "goal" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PartyParticipant" DROP COLUMN "amountPaid",
ALTER COLUMN "paid" DROP NOT NULL;
