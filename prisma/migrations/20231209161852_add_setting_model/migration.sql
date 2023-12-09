-- CreateTable
CREATE TABLE "Setting" (
    "id" SERIAL NOT NULL,
    "bannerUrls" TEXT[],

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);
