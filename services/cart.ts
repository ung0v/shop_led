"use server"

import prisma from "@/lib/prisma"

export const addToCart = async (data: {
  userId: string
  productId: number
  quantity: number
}) => {
  console.log("check if session is exist or not")
  // check if session is exist or not
  let sessionId = (
    await prisma.shoppingSession.findFirst({
      where: {
        userId: data.userId,
      },
    })
  )?.id
  console.log("if not create new one")
  // if not create new one
  if (!sessionId) {
    sessionId = (
      await prisma.shoppingSession.create({
        data: {
          userId: data.userId,
          total: 0,
        },
      })
    ).id
  }
  console.log("check product in cart or not")
  // check product in cart or not
  const isExistProduct = (
    await prisma.cartItem.findUnique({
      where: {
        productId: data.productId,
      },
    })
  )?.id
  console.log("if true then only update the quantity")
  // if true then only update the quantity
  if (isExistProduct) {
    await prisma.cartItem.update({
      data: {
        quantity: data.quantity,
      },
      where: {
        sessionId,
        productId: data.productId,
      },
    })
  } else {
    console.log("if false create new cart item")
    // if false create new cart item
    await prisma.cartItem.create({
      data: {
        sessionId,
        productId: data.productId,
        quantity: data.quantity,
      },
    })
  }

  console.log("handle sum total")
  // handle sum total
  const carts = await prisma.cartItem.findMany({ where: { sessionId } })
  let total = 0
  for (const item of carts) {
    const price =
      (await prisma.product.findUnique({ where: { id: item.productId } }))
        ?.price ?? 0
    total += (price as number) * item.quantity
  }
  return await prisma.shoppingSession.update({
    data: {
      total,
    },
    where: { id: sessionId },
  })
}

export const getCart = async (data: { userId: string }) => {
  const session = await prisma.shoppingSession.findUnique({
    where: { userId: data.userId },
  })
  if (session) {
    // TODO
  }
  return null
}
