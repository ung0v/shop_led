/*
  Warnings:

  - The primary key for the `ShoppingSession` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_sessionId_fkey";

-- DropIndex
DROP INDEX "CartItem_sessionId_key";

-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "sessionId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ShoppingSession" DROP CONSTRAINT "ShoppingSession_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShoppingSession_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ShoppingSession_id_seq";

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ShoppingSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
