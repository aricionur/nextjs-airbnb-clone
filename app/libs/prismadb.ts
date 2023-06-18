import { PrismaClient } from '@prisma/client'

// this is a best practice for Next13, Also you can also use PrismaClient directly where you need.
declare global {
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client
