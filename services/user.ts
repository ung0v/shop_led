"use server"

import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"

import prisma from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const createUser = async (body: any) => {
  const { username, name, email, password, address, phoneNumber } = body
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password,
        email,
        name,
        address,
        address2: "",
        address3: "",
        phoneNumber,
        // USER ROLE
        roleId: 3,
      },
    })
    return user
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === "P2002") {
        if (error?.meta?.target?.length) {
          return {
            message: "Duplicated",
            name: error?.meta?.target[0],
            status: "ERROR",
          }
        }
      }
    }
    throw error
  }
}

export const getCurrentUser = async () => {
  const userSession = await getServerSession(authOptions)
  if (userSession?.user) {
    const user = prisma.user.findUnique({ where: { id: userSession.user.id } })
    if (user) {
      return user
    }
  }
  throw "No user found"
}

export const mutateChangePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const user = await getCurrentUser()
  if (user?.id) {
    if (user.password !== oldPassword) {
      throw "Wrong old password!"
    }
    return await prisma.user.update({
      where: { id: user.id },
      data: { password: newPassword },
    })
  }
  throw "No user found"
}
