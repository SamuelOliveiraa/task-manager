import type { FastifyInstance } from "fastify";

import { authenticated } from "@/middlewares/authenticated.ts";
import { isAdmin } from "@/middlewares/isAdmin.ts";


export default async function teamsMembersRoutes(app: FastifyInstance) {
//   const controller = new TeamsMembersController();

  app.addHook("preHandler", authenticated);
  app.addHook("preHandler", isAdmin);

//   await getTeamsRoute(app, controller);
//   await postTeamsRoute(app, controller);
//   await deleteTeamRoute(app, controller);
}
