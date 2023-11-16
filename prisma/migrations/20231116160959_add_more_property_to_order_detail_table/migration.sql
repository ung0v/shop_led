/*
  Warnings:

  - Added the required column `depositName` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentType` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipient` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingAddress` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingNote` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingPhone` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingType` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "OrderItem_orderId_key";

-- AlterTable
ALTER TABLE "OrderDetails" ADD COLUMN     "depositName" TEXT NOT NULL,
ADD COLUMN     "paymentType" TEXT NOT NULL,
ADD COLUMN     "recipient" TEXT NOT NULL,
ADD COLUMN     "shippingAddress" TEXT NOT NULL,
ADD COLUMN     "shippingNote" TEXT NOT NULL,
ADD COLUMN     "shippingPhone" TEXT NOT NULL,
ADD COLUMN     "shippingType" TEXT NOT NULL;
