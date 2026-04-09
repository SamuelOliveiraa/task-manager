import type { FastifyInstance } from "fastify";

import { authenticated } from "@/middlewares/authenticated.ts";
import { isAdmin } from "@/middlewares/isAdmin.ts";
import { postTeamMembersRoute } from "./post-team-members.ts";
import { TeamMembersController } from "@/controllers/TeamMembersController.ts";
import { deleteTeamMemberRoute } from "./delete-team-member.ts";

export default async function teamMembersRoutes(app: FastifyInstance) {
  const controller = new TeamMembersController();

  app.addHook("preHandler", authenticated);
  app.addHook("preHandler", isAdmin);

  await postTeamMembersRoute(app, controller);
  await deleteTeamMemberRoute(app, controller);
}
