import { auth } from "@/lib/auth.ts";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function isAdmin(request: FastifyRequest, reply: FastifyReply) {
  const session = await auth.api.getSession({
    headers: request.headers as HeadersInit
  });

  if (!session || session?.user.role !== "admin") {
    return reply.status(401).send({ message: "User is not authorized" });
  }
}
