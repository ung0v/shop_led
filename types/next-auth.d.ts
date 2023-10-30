import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      roleId: number
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User extends DefaultUser {
    roleId: number
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    roleId: number
    id: string
  }
}
