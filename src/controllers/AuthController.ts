import { env } from "@/env/index.ts";
import { AuthModel } from "@/models/AuthModel.ts";
import type { FastifyReply, FastifyRequest } from "fastify";

export class AuthController {
  #model: AuthModel;

  constructor() {
    this.#model = new AuthModel();
  }

  login = async (
    request: FastifyRequest<{
      Body: {
        email: string;
        password: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { email, password } = request.body;

      const response = await this.#model.login(email, password);

      if (!response || response.status !== 200) {
        return reply.status(404).send({
          message: "E-mail or password is incorrect"
        });
      }

      const authHeaders = response.headers;
      authHeaders.forEach((value, key) => {
        if (key.toLowerCase() === "set-cookie") {
          reply.header("set-cookie", value);
        }
      });

      const authData = await response.json();

      const simpleUser = {
        id: authData.user.id,
        name: authData.user.name,
        email: authData.user.email
      };

      return reply.status(201).send({
        message: "User Logged in successfully",
        user: simpleUser
      });
    } catch (error) {
      if (env.NODE_ENV === "dev") {
        console.error(error);
      }

      throw error;
    }
  };

  create = async (
    request: FastifyRequest<{
      Body: {
        name: string;
        email: string;
        password: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { name, email, password } = request.body;
      const response = await this.#model.register(name, email, password);

      if (!response) {
        return reply.status(404).send({
          message: "E-mail is already in use"
        });
      }

      return reply.status(201).send({
        message: "User created successfully"
      });
    } catch (error) {
      if (env.NODE_ENV === "dev") {
        console.error(error);
      }

      throw error;
    }
  };
}
