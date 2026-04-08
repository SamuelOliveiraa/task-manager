import { TeamsMembersModel } from "@/models/TeamsMembersModel.ts";
import type { FastifyReply, FastifyRequest } from "fastify";
import { env } from "@/env/index.ts";

export class TeamsMembersController {
  #model: TeamsMembersModel;

  constructor() {
    this.#model = new TeamsMembersModel();
  }

  // Read all teams
  // index = async (_: FastifyRequest, reply: FastifyReply) => {
  //   try {
  //     const teams = await this.#model.index();
  //     return reply.send({ message: "Teams is ok", teams: teams });
  //   } catch (error) {
  //     if (env.NODE_ENV === "dev") {
  //       console.log(error);
  //     }
  //     throw error;
  //   }
  // };

  // Create a new
  store = async (
    request: FastifyRequest<{
      Params: {
        team_id: string;
        user_id: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { team_id, user_id } = request.params;

      if (!team_id || !user_id) {
        return reply
          .status(400)
          .send({ message: "User ID and Team ID are required" });
      }

      const team = await this.#model.create()

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

  // Delete a 
  delete = async (request: FastifyRequest<{Params: {team_id: string}}>, reply: FastifyReply) => {
    try{
      const {team_id} = request.params

      if (!team_id) {
        return reply
          .status(400)
          .send({ message: "Team was not found" });
      }
      
      const team = await this.#model.

      if(!team){
        return reply.status(500).send({ message: "Failed to delete a team" });
      }

      return reply.status(204)

    }catch(error){
      if (env.NODE_ENV === "dev") {
        console.log(error);
      }
      throw error;
    }
  }
}
