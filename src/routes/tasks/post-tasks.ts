import type { FastifyInstance } from "fastify";
import z from "zod";

export const postTasksRoute = async (
  app: FastifyInstance,
  controller: 
) => {
  app.post(
    "/",
    {
      schema: {
        tags: ["tasks"],
        summary: "Post a new task",
        description:
          "This route create a new task from the tasks table on the database.",
        response: {
          200: z.object({
            message: z.string().describe("Returned when the task was created"),
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
        body: z.object({
            
        })
      }
    },
    controller.index
  );
};
