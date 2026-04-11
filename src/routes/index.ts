import type { FastifyInstance } from "fastify";
import usersRoutes from "./users/index.ts";
import authRoutes from "./auth/index.ts";
import teamsRoutes from "./teams/index.ts";
import teamMembersRoutes from "./team-members/index.ts";
import tasksRoutes from "./tasks/index.ts";

export default async function routes(app: FastifyInstance) {
  await app.register(usersRoutes, { prefix: "/users" });
  await app.register(authRoutes, { prefix: "/auth" });
  await app.register(teamsRoutes, { prefix: "/teams" });
  await app.register(teamMembersRoutes, { prefix: "/teams_members" });
  await app.register(tasksRoutes, {prefix: "/tasks"})
}
