import type { FastifyInstance } from "fastify";
import z from "zod";

export const loginRoute = async (
  app: FastifyInstance,
  controller: 
) => {
  app.get(
    "",
    {
      schema: {
        tags: ["auth"],
        summary: "Login",
        description:
          "",
        response: {
          200: z.object({
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
