import type { Role } from "@/generated/prisma/enums.ts";
import { FastifyRequest } from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    user: {
      id: string;
      name: string;
      email: string;
      role: Role
      updatedAt: Date;
      createdAt: Date;
      emailVerified: boolean;
    };
    session: {
      id: string;
      token: string;
      userId: string;
      updatedAt: Date;
      createdAt: Date;
      expiresAt: Date;
    };
  }
}
