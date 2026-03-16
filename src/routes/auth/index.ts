import type { FastifyInstance } from "fastify";
import { AuthController } from "@/controllers/AuthControllers.ts";
import { loginRoute } from "./login.ts";
import { registerRoute } from "./register.ts";

export default async function authRoutes(app: FastifyInstance) {
  const controller = new AuthController();

  // Rotas publicas
  await loginRoute(app, controller);
  await registerRoute(app, controller);
}
