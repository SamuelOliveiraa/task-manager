import type { AuthController } from "@/controllers/AuthControllers.ts";
import type { FastifyInstance } from "fastify";
import z from "zod";

export const registerRoute = async (
  app: FastifyInstance,
  controller: AuthController
) => {
  app.post(
    "/register",
    {
      schema: {
        tags: ["auth"],
        summary: "Register",
        description: "This route registers a new user to database.",
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
          name: z.string(),
          email: z.email(),
          password: z.string().min(6)
        })
      }
    },
    controller.create
  );
};
