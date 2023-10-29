"use server"

import prisma from "@/lib/prisma"

export const getAllProduct = async () => {
  return await prisma.product.findMany()
}

export const getProductByCategoryId = async (categoryId: number) => {
  return await prisma.product.findMany({
    where: {
      categoryId,
    },
  })
}

export const getProductByName = async (name: string | null) => {
  return await prisma.product.findMany({
    where: {
      name: {
        contains: name ?? "",
        mode: "insensitive",
      },
    },
  })
}

export const getProductById = async (productId: number) => {
  const item = await prisma.product.findUnique({ where: { id: productId } })
  const inventory = await prisma.inventory.findUnique({
    where: { id: item?.inventoryId },
  })
  return { ...item, quantity: inventory?.quantity }
}

export const createProduct = async (data: any) => {
  const inventory = await prisma.inventory.create({
    data: {
      quantity: data.quantity,
    },
  })
  return await prisma.product.create({
    data: {
      name: data.name,
      shortDesc: data.shortDesc,
      desc: data.desc,
      brand: data.brand,
      SKU: data.SKU,
      price: data.price,
      categoryId: data.categoryId,
      inventoryId: inventory.id,
      images: data.images,
      attributes: JSON.stringify(data.attributes),
      isPublish: data.isPublish,
    },
  })
}

export const updateProduct = async (data: any) => {
  const inventory = await prisma.inventory.update({
    data: {
      quantity: data.quantity,
    },
    where: {
      id: data.inventoryId,
    },
  })
  return await prisma.product.update({
    data: {
      name: data.name,
      shortDesc: data.shortDesc,
      desc: data.desc,
      brand: data.brand,
      SKU: data.SKU,
      price: data.price,
      categoryId: data.categoryId,
      inventoryId: inventory.id,
      images: data.images,
      attributes: JSON.stringify(data.attributes),
      // isPublish: data.isPublish,
    },
    where: {
      id: data.id,
    },
  })
}

export const deleteProduct = async (data: { id: number }) => {
  return await prisma.product.delete({
    where: {
      id: data.id,
    },
  })
}
