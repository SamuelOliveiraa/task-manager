import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.ts";
import { env } from "@/env/index.ts";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  baseURL: env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true
  },
  trustedOrigins: ["http://localhost:3333"],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "member"
      }
    }
  }
});
