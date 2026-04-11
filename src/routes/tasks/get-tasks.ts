import type { TasksController } from "@/controllers/TasksController.ts";
import type { FastifyInstance } from "fastify";
import z from "zod";

export const getTasksRoute = async (
  app: FastifyInstance,
  controller: TasksController
) => {
  app.get(
    "/",
    {
      schema: {
        tags: ["tasks"],
        summary: "Get all tasks",
        description:
          "This route gets all tasks from the tasks table on the database.",
        response: {
          200: z.object({
            message: z.string(),
            tasks: z
              .array(
                z.object({
                  id: z.string(),
                  title: z.string().min(2).max(100),
                  description: z.string(),
                  priority: z.enum(["high", "medium", "low"]),
                  status: z.enum(["pending", "in_progress", "completed"]),
                  createdAt: z.date(),
                  team: z.object({
                    id: z.uuid(),
                    name: z.string()
                  }),
                  user: z.object({
                    id: z.uuid(),
                    name: z.string(),
                    email: z.email()
                  })
                })
              )
              .describe("Gives an array of tasks")
          }),
          404: z
            .object({
              message: z.string(),
              code: z.any().optional()
            })
            .describe("Returned when the user provides an invalid property"),
          500: z
            .object({
              message: z.string(),
              code: z.any().optional()
            })
            .describe("Returned when an unexpected server error occurs")
        },
        querystring: {
          status: z.enum(["pending", "in_progress", "completed"]),
          priority: z.enum(["high", "medium", "low"])
        }
      }
    },
    controller.index
  );
};
