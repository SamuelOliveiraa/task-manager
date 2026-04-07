import type { TeamsController } from "@/controllers/TeamsController.ts";
import type { FastifyInstance } from "fastify";
import z from "zod";

export const postTeamsRoute = async (
  app: FastifyInstance,
  controller: TeamsController
) => {
  app.post(
    "/",
    {
      schema: {
        tags: ["teams"],
        summary: "Create a team",
        description:
          "This route creates a team in the teams table on the database.",
        response: {
          200: z.object({
            message: z.string()
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
          name: z.string().min(2).max(100),
          description: z.string().optional()
        })
      }
    },
    controller.store
  );
};
