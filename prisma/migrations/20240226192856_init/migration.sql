/*
  Warnings:

  - You are about to drop the column `udpatedAt` on the `Update` table. All the data in the column will be lost.
  - You are about to drop the column `udpatedAt` on the `UpdatePoint` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Update" DROP COLUMN "udpatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "UpdatePoint" DROP COLUMN "udpatedAt",
ADD COLUMN     "updatededAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
