/*
  Warnings:

  - You are about to drop the column `paymentId` on the `OrderDetails` table. All the data in the column will be lost.
  - Added the required column `amount` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PaymentDetails" DROP CONSTRAINT "PaymentDetails_orderId_fkey";

-- AlterTable
ALTER TABLE "OrderDetails" DROP COLUMN "paymentId",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "depositName" DROP NOT NULL;
