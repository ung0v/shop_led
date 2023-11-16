import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
async function main() {
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      email: "admin@ledmoa.co.kr",
      name: "Vuong",
      password: "1111",
      phoneNumber: "",
      address: "",
      roleId: 2,
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
