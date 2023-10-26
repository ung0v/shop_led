"use server"

import { User } from "@prisma/client"

export const createUser = async (body: any) => {
  const { username, name, email, password, address, phoneNumber } = body
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
}
