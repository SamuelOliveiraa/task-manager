import { TasksController } from "@/controllers/TasksController.ts";
import type { FastifyInstance } from "fastify";
import { getTasksRoute } from "./get-tasks.ts";
import { deleteTaskRoute } from "./delete-task.ts";
import { authenticated } from "@/middlewares/authenticated.ts";
import { isAdmin } from "@/middlewares/isAdmin.ts";
import { postTasksRoute } from "./post-tasks.ts";
import { getTasksByUserIDRoute } from "./get-tasks-by-user-id.ts";


export default async function tasksRoutes(app: FastifyInstance) {
  const controller = new TasksController();
  
  app.addHook("preHandler", authenticated);

  await getTasksRoute(app, controller)
  await deleteTaskRoute(app, controller)
  await postTasksRoute(app, controller)
  await getTasksByUserIDRoute(app, controller)
}
