import { TasksController } from "@/controllers/TasksController.ts";
import type { FastifyInstance } from "fastify";
import { getTasksRoute } from "./get-tasks.ts";
import { deleteTaskRoute } from "./delete-task.ts";


export default async function tasksRoutes(app: FastifyInstance) {
  const controller = new TasksController();

  await getTasksRoute(app, controller)
  await deleteTaskRoute(app, controller)
}
