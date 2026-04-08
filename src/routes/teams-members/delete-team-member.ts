import type { FastifyInstance } from "fastify";
import z from "zod";

export const deleteTeamMemberRoute = async (
  app: FastifyInstance,
  controller: TeamsMembersController
) => {
  app.delete(
    "/:team_id/:user_id",
    {
      schema: {
        tags: ["teams"],
        summary: "Deletes the user from a specific team",
        description:
          "This route deletes the user from a specific team on the teams table on the database.",
        response: {
          204: z.null().describe("Returned when the user was successfully deleted of the team."),
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
        params: {
            team_id: z.uuid(),
            user_id: z.uuid()
        } 
      }
    },
    controller.delete
  );
};
