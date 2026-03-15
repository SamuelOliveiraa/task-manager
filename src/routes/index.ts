import type { FastifyInstance } from "fastify";
import usersRoutes from "./users/index.ts";

export default async function routes(app: FastifyInstance) {
  await app.register(usersRoutes, { prefix: "/users" });
}
