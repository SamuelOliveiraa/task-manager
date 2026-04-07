import { env } from "@/env/index.ts";
import { TeamModel } from "@/models/TeamModel.ts";
import type { FastifyReply, FastifyRequest } from "fastify";

export class TeamsController {
  #model: TeamModel;

  constructor() {
    this.#model = new TeamModel();
  }

  // Read all teams
  index = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const teams = await this.#model.index();
      return reply.send({ message: "Teams is ok", teams: teams });
    } catch (error) {
      if (env.NODE_ENV === "dev") {
        console.log(error);
      }
      throw error;
    }
  };

  // Create a new teams
  store = async (
    request: FastifyRequest<{
      Body: {
        name: string;
        description?: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { name, description } = request.body;

      if (!name || !description) {
        return reply
          .status(400)
          .send({ message: "Name or description are required" });
      }

      const team = await this.#model.create(name, description);

      if (!team) {
        return reply.status(500).send({ message: "Failed to create team" });
      }

      return reply.send({ message: "Team created successfully" });
    } catch (error) {
      if (env.NODE_ENV === "dev") {
        console.log(error);
      }
      throw error;
    }
  };
}
