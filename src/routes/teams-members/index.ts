import type { FastifyInstance } from "fastify";

import { authenticated } from "@/middlewares/authenticated.ts";
import { isAdmin } from "@/middlewares/isAdmin.ts";
import { postTeamsMembersRoute } from "./post-teams-members.ts";
import { TeamsMembersController } from "@/controllers/TeamsMembersController.ts";
import { deleteTeamMemberRoute } from "./delete-team-member.ts";

export default async function teamsMembersRoutes(app: FastifyInstance) {
  const controller = new TeamsMembersController();

  app.addHook("preHandler", authenticated);
  app.addHook("preHandler", isAdmin);

  await postTeamsMembersRoute(app, controller);
  await deleteTeamMemberRoute(app, controller);
}
