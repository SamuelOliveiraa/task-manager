import type { TeamsController } from "@/controllers/TeamsController.ts";
import type { FastifyInstance } from "fastify";
import z, { object } from "zod";

export const getTeamsRoute = async (
  app: FastifyInstance,
  controller: TeamsController
) => {
  app.get(
    "/:team_id",
    {
      schema: {
        tags: ["teams-members"],
        summary: "Get all teams members of a team",
        description:
          "This route gets all teams members of a team from the teams members table on the database.",
        response: {
          200: z.object({
            message: z.string(),
            team_members: z
              .array(
                z.object({
                  user: z.object({
                    id: z.uuid(),
                    email: z.email(),
                    name: z.string(),
                    role: z.enum(["member", "admin"])
                  }),
                  team: z.object({
                    name: z.string()
                  })
                })
              )
              .describe("Gives an array of team member")
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
            team_id: z.uuid()
        })
      }
    },
    controller.index
  );
};
