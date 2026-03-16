import type { FastifyInstance } from "fastify";
import usersRoutes from "./users/index.ts";
import authRoutes from "./auth/index.ts";

export default async function routes(app: FastifyInstance) {
  await app.register(usersRoutes, { prefix: "/users" });
  await app.register(authRoutes, { prefix: "/auth" });
}
