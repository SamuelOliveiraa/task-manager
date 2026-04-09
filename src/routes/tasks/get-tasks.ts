import type { FastifyInstance } from "fastify";
import z from "zod";

export const getTasksRoute = async (
  app: FastifyInstance,
  controller: 
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
            teams: z
              .array(
                z.object({
                  id: z.string(),
                  name: z.string().min(2).max(100),
                  description: z.string()
                })
              )
              .describe("Gives an array of teams")
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
        }
      }
    },
    controller.index
  );
};
