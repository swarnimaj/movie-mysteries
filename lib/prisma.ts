import { PrismaClient } from "@prisma/client";

// Prevent hot reloading from creating new instances in development
declare global {
  var prismaGlobal: PrismaClient | undefined;
}

// Use global instance in development, new instance in production
export const prisma: PrismaClient = global.prismaGlobal ?? new PrismaClient();

// Store the instance globally in development to prevent reconnections
if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}


