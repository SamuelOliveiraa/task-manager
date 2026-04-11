import type { TasksController } from "@/controllers/TasksController.ts";
import type { FastifyInstance } from "fastify";
import z from "zod";

export const deleteTaskRoute = async (
  app: FastifyInstance,
  controller: TasksController
) => {
  app.delete(
    "/:task_id",
    {
      schema: {
        tags: ["task"],
        summary: "Delete a task by ID",
        description:
          "This route delete a task by ID from the task table on the database.",
        response: {
          204: z
            .null()
            .describe("Returned when the task is successfully deleted"),
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
        params: z.object({
          task_id: z.uuid()
        })
      }
    },
    controller.delete
  );
};
