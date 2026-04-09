import type { TeamMembersController } from "@/controllers/TeamMembersController.ts";
import type { FastifyInstance } from "fastify";
import z from "zod";

export const postTeamMembersRoute = async (
  app: FastifyInstance,
  controller: TeamMembersController
) => {
  app.post(
    "/:team_id/:user_id",
    {
      schema: {
        tags: ["teams_members"],
        summary: "Create a team member",
        description:
          "This route creates a team member in the teams table on the database.",
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
        params: z.object({
          team_id: z.uuid(),
          user_id: z.string()
        })
      }
    },
    controller.store
  );
};
