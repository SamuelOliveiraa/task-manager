import type { FastifyInstance } from "fastify";

export async function tasksHistoryRoutes(app: FastifyInstance) {
  app.get("/", async (response, reply) => {
    return reply.send({ message: "Hello World" });
  });
}
