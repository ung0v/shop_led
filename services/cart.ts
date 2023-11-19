"use server"

import { OrderDetails } from "@prisma/client"
import { getServerSession } from "next-auth"

import prisma from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const updateTotalShoppingSession = async (sessionId?: string) => {
  if (!sessionId) {
    const userSession = await getServerSession(authOptions)
    sessionId = (
      await prisma.shoppingSession.findFirst({
        where: {
          userId: userSession?.user.id,
        },
      })
    )?.id
  }
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
  const oldCart = await prisma.cartItem.findFirst({
    where: {
      sessionId,
      productId: data.productId,
    },
  })

  console.log("if true then only update the quantity")
  // if true then only update the quantity
  if (oldCart?.id) {
    await prisma.cartItem.update({
      data: {
        quantity: oldCart.quantity + data.quantity,
      },
      where: {
        id: oldCart.id,
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
  updateTotalShoppingSession(sessionId)
}

export const getCart = async () => {
  const userSession: any = await getServerSession(authOptions)
  if (userSession.user) {
    const session = await prisma.shoppingSession.findUnique({
      where: { userId: userSession.user.id },
    })
    if (session) {
      let cartItem: any = await prisma.cartItem.findMany({
        where: { sessionId: session.id },
      })
      for (let index = 0; index < cartItem.length; index++) {
        const product = await prisma.product.findUnique({
          where: { id: cartItem[index].productId },
        })
        cartItem[index].name = product?.name
        cartItem[index].image = product?.images[0]
        cartItem[index].price = product?.price
        cartItem[index].subtotal =
          cartItem[index].price * cartItem[index].quantity
      }
      return { data: cartItem, total: session.total }
    }
  }

  return null
}

export const createOrder = async (data: { userId: string } & OrderDetails) => {
  const order = await prisma.orderDetails.create({
    data: data,
  })
  return order.id
}
export const createOrderItem = async (orderId: number, cartList: any[]) => {
  return Promise.allSettled([
    cartList.map((cart) =>
      prisma.orderItem.create({
        data: { productId: cart.productId, quantity: cart.quantity, orderId },
      })
    ),
  ])
}
export const deleteCartItem = async (cartList: any[]) => {
  return Promise.allSettled([
    cartList.map((cart) =>
      prisma.cartItem.delete({
        where: { id: cart.id },
      })
    ),
  ])
}
