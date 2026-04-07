import { auth } from "@/lib/auth.ts";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function authenticated(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const session = await auth.api.getSession({
    headers: request.headers as HeadersInit
  });

  if (!session) {
    return reply.status(401).send({ message: "Session not found or expired" });
  }

  request.user = session.user;
  request.session = session.session;
}
