import type { FastifyInstance } from "fastify";
import { getUsersRoute } from "./get-users.ts";
import { UsersController } from "@/controllers/UsersControllers.ts";
import { authenticated } from "@/middlewares/authenticated.ts";
import { isAdmin } from "@/middlewares/isAdmin.ts";

export default async function usersRoutes(app: FastifyInstance) {
  const controller = new UsersController();

  app.addHook("preHandler", authenticated);
  app.addHook("preHandler", isAdmin);

  await getUsersRoute(app, controller);
}
