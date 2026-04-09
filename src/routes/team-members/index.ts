import type { FastifyInstance } from "fastify";

import { authenticated } from "@/middlewares/authenticated.ts";
import { isAdmin } from "@/middlewares/isAdmin.ts";
import { postTeamMembersRoute } from "./post-team-members.ts";
import { TeamMembersController } from "@/controllers/TeamMembersController.ts";
import { deleteTeamMemberRoute } from "./delete-team-member.ts";
import { getTeamMembersRoute } from "./get-team-members.ts";

export default async function teamMembersRoutes(app: FastifyInstance) {
  const controller = new TeamMembersController();

  app.addHook("preHandler", authenticated);
  await getTeamMembersRoute(app, controller);
  
  app.register(async (privateRoutes) => {
    privateRoutes.addHook("preHandler", isAdmin);
  
    await postTeamMembersRoute(privateRoutes, controller);
    await deleteTeamMemberRoute(privateRoutes, controller);
  })
}
