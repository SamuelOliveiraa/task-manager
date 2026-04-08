import type { FastifyInstance } from "fastify";

import { authenticated } from "@/middlewares/authenticated.ts";
import { isAdmin } from "@/middlewares/isAdmin.ts";
import { TeamsController } from "@/controllers/TeamsController.ts";

import { getTeamsRoute } from "./get-teams.ts";
import { postTeamsRoute } from "./post-teams.ts";
import { deleteTeamRoute } from "./delete-team.ts";

export default async function teamsRoutes(app: FastifyInstance) {
  const controller = new TeamsController();

  app.addHook("preHandler", authenticated);
  app.addHook("preHandler", isAdmin);

  await getTeamsRoute(app, controller);
  await postTeamsRoute(app, controller);
  await deleteTeamRoute(app, controller);
}
