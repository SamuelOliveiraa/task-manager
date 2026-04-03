import type { AuthController } from "@/controllers/AuthControllers.ts";
import type { FastifyInstance } from "fastify";
import z from "zod";

export const loginRoute = async (
  app: FastifyInstance,
  controller: AuthController
) => {
  app.post(
    "/login",
    {
      schema: {
        tags: ["auth"],
        summary: "Login",
        description:
          "This route allows users to log in by providing their email and password.",
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
          email: z.email(),
          password: z.string().min(6)
        })
      }
    },
    controller.login
  );
};
