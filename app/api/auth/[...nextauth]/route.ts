import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { AuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

import prisma from "@/lib/prisma"

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials?.username },
        })

        if (!user) throw new Error("user with that email does not exist")

        // ⚠️ WARNING: DO NOT do this in real-world development
        if (user.password !== credentials?.password)
          throw new Error("incorrect password")

        return user
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  secret: "secret", // store this in a .env file
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
