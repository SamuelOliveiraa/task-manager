import type { FastifyInstance } from "fastify";
import { authenticated } from "@/middlewares/authenticated.ts";
import { isAdmin } from "@/middlewares/isAdmin.ts";
import { getTeamsRoute } from "./get-teams.ts";
import { TeamsController } from "@/controllers/TeamsController.ts";
import { postTeamsRoute } from "./post-teams.ts";

export default async function teamsRoutes(app: FastifyInstance) {
  const controller = new TeamsController();

  app.addHook("preHandler", authenticated);
  app.addHook("preHandler", isAdmin);

  await getTeamsRoute(app, controller);
  await postTeamsRoute(app, controller);
}
