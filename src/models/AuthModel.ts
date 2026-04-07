import { auth } from "@/lib/auth.ts";
import { prisma } from "@/lib/prisma.ts";

export class AuthModel {
  async login(email: string, password: string) {
    const responseAuth = await auth.api.signInEmail({
      body: { email, password },
      asResponse: true
    });

    if (responseAuth.statusText === "UNAUTHORIZED") {
      return null;
    }

    return responseAuth;
  }

  async register(name: string, email: string, password: string) {
    const userExists = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (userExists) {
      return null;
    }

    const responseAuth = await auth.api.signUpEmail({
      body: { name, email, password, role: "admin" },
      asResponse: true
    });

    return responseAuth;
  }
}
