import type { FastifyInstance } from "fastify";
import { getUsersRoute } from "./get-users.ts";
import { UsersController } from "@/controllers/UsersControllers.ts";

export default async function usersRoutes(app: FastifyInstance) {
  const controller = new UsersController();

  await getUsersRoute(app, controller);
}
