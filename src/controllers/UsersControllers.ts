import { env } from "@/env/index.ts";
import { UserModel } from "@/models/UserModel.ts";
import type { FastifyReply, FastifyRequest } from "fastify";

export class UsersController {
  #model: UserModel;

  constructor() {
    this.#model = new UserModel();
  }

  index = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const users = await this.#model.index();
      return reply.send({ message: "Users is ok", users: users });
    } catch (error) {
      if (env.NODE_ENV === "dev") {
        console.log(error);
      }
      throw error;
    }
  };
}
