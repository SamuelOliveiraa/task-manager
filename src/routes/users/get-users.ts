import type { UsersController } from "@/controllers/UsersControllers.ts";
import type { FastifyInstance } from "fastify";
import z from "zod";

export const getUsersRoute = async (
  app: FastifyInstance,
  controller: UsersController
) => {
  app.get(
    "/",
    {
      schema: {
        tags: ["users"],
        summary: "Get all users",
        description:
          "This route gets all users from the users table on the database.",
        response: {
          200: z.object({
            message: z.string(),
            users: z
              .array(
                z.object({
                  id: z.string(),
                  name: z.string().min(2).max(100),
                  email: z.email()
                })
              )
              .describe("Gives an array of users")
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
