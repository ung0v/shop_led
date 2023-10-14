import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      username,
      name,
      email,
      password,
      address,
      phoneNumber,
      isSubcribedEmail,
      isSubcribedPhone,
    } = body
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
        isSubcribedEmail,
        isSubcribedPhone,
      },
    })
    return NextResponse.json(user)
  } catch (error: any) {
    console.log({ error })
  }
}
