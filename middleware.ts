// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage

import { NextResponse } from "next/server"
import { NextRequestWithAuth, withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    // console.log(request.nextUrl.pathname)
    // console.log(request.nextauth.token)
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.roleId !== 2
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url))
    }
  },
  {
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized: ({ token }) => {
        return !!token
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
)

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/cart", "/admin/:path*"] }
