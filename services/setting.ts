"use server"

import prisma from "@/lib/prisma"

export const getBannerUrl = async () => {
  const res = await prisma.setting.findFirst()
  return res?.bannerUrls
}

export const updateBannerUrl = async (bannerUrls: string[]) => {
  const res = await prisma.setting.findFirst()
  if (res) {
    return await prisma.setting.update({
      data: { bannerUrls },
      where: { id: res.id },
    })
  }

  return await prisma.setting.create({ data: { bannerUrls } })
}
