/*
  Warnings:

  - Added the required column `address` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderDetails" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;
