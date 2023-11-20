"use server"

import { OrderDetails } from "@prisma/client"

import prisma from "@/lib/prisma"

export const getAllOrder = async () => {
  return await prisma.orderDetails.findMany()
}

export const getOrderDetailsById = async (id: number) => {
  return await prisma.orderDetails.findUnique({ where: { id } })
}

export const getOrderItemById = async (orderId: number) => {
  return await prisma.orderItem.findMany({ where: { orderId } })
}

export const createOrder = async (data: { userId: string } & OrderDetails) => {
  const order = await prisma.orderDetails.create({
    data: data,
  })
  return order.id
}

export const updateOrderDetails = async (data: Partial<OrderDetails>) => {
  const order = await prisma.orderDetails.update({
    where: { id: data.id },
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
