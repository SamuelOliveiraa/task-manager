import type { FastifyInstance } from "fastify";

export async function authRoutes(app: FastifyInstance) {
  app.get("/", async (response, reply) => {
    return reply.send({ message: "Hello World" });
  });
}
