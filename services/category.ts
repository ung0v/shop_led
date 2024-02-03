"use server"

import { Category } from "@prisma/client"

import prisma from "@/lib/prisma"

export const getAllCategory = async () => {
  const item = await prisma.category.findMany({
    orderBy: {
      order: "asc",
    },
    where: {
      deleted: false,
    },
  })
  return item
}

export const getCategoryById = async (categoryId: number) => {
  const item = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  })
  return item
}

export const createCategory = async (data: {
  name: string
  description?: string
}) => {
  const item = await prisma.category.create({
    data: {
      name: data.name,
      description: data.description,
    },
  })
  return item
}

export const updateCategory = async (data: {
  id: number
  name: string
  description?: string
}) => {
  const item = await prisma.category.update({
    data: {
      name: data.name,
      description: data.description,
    },
    where: {
      id: data.id,
    },
  })
  return item
}

export const updateOrderCategory = async (data: Category[]) => {
  for (const item of data) {
    await prisma.category.update({
      data: {
        order: item.order,
      },
      where: {
        id: item.id,
      },
    })
  }
}

export const deleteCategory = async (data: { id: number }) => {
  const item = await prisma.category.delete({
    where: {
      id: data.id,
    },
  })
  return item
}
