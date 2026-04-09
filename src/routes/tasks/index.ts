import type { FastifyInstance } from "fastify";

import { getTeamsRoute } from "./get-teams.ts";
import { postTeamsRoute } from "./post-teams.ts";
import { deleteTeamRoute } from "./delete-team.ts";

export default async function tasksRoutes(app: FastifyInstance) {
  const controller = new TeamsController();

  await getTeamsRoute(app, controller);
  await postTeamsRoute(app, controller);
  await deleteTeamRoute(app, controller);
}
