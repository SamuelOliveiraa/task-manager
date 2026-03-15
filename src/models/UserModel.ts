import { prisma } from "@/lib/prisma.ts";

export class UserModel {
  async index() {
    const users = await prisma.user.findMany();

    if (users.length === 0) return [];

    return users;
  }
}
