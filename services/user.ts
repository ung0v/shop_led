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
  const userSession: any = await getServerSession(authOptions)
  if (userSession.user) {
    const user = prisma.user.findUnique({ where: { id: userSession.user.id } })
    if (user) {
      return user
    }
  }
  throw "No user found"
}
