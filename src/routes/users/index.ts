import type { FastifyInstance } from "fastify";
import { getUsersRoute } from "./get-users.ts";
import { UsersController } from "@/controllers/UsersControllers.ts";
import { authenticated } from "@/middlewares/authenticated.ts";

export default async function usersRoutes(app: FastifyInstance) {
  const controller = new UsersController();

  app.addHook("preHandler", authenticated);

  await getUsersRoute(app, controller);
}
