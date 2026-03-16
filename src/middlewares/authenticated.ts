import { auth } from "@/lib/auth.ts";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function authenticated(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const session = await auth.api.getSession({
    headers: request.headers as Record<string, string>
  });

  if (!session) {
    return reply.status(401).send({ message: "Unauthorized" });
  }

  request.user = session.user;
  request.session = session.session;
}
