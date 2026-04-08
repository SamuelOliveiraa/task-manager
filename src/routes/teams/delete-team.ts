import type { TeamsController } from "@/controllers/TeamsController.ts";
import type { FastifyInstance } from "fastify";
import z from "zod";

export const deleteTeamRoute = async (
  app: FastifyInstance,
  controller: TeamsController
) => {
  app.delete(
    "/:team_id",
    {
      schema: {
        tags: ["teams"],
        summary: "Delete a team by ID",
        description:
          "This route delete a team by ID from the teams table on the database.",
        response: {
          204: z
            .null()
            .describe("Returned when the team is successfully deleted"),
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
          team_id: z.uuid()
        })
      }
    },
    controller.delete
  );
};
