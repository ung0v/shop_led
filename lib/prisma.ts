import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient
}

const client = globalThis.prisma || new PrismaClient()

client.$use(async (params, next) => {
  // Check incoming query type
  if (params.model !== "CartItem") {
    if (params.action == "delete") {
      // Delete queries
      // Change action to an update
      params.action = "update"
      params.args["data"] = { deleted: true }
    }
    if (params.action == "deleteMany") {
      // Delete many queries
      params.action = "updateMany"
      if (params.args.data != undefined) {
        params.args.data["deleted"] = true
      } else {
        params.args["data"] = { deleted: true }
      }
    }
  }

  return next(params)
})

if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client
