import { TeamMembersModel } from "@/models/TeamMembersModel.ts";
import type { FastifyReply, FastifyRequest } from "fastify";
import { env } from "@/env/index.ts";

export class TeamMembersController {
  #model: TeamMembersModel;

  constructor() {
    this.#model = new TeamMembersModel();
  }

  // Read all team members
  index = async (request: FastifyRequest<{
    Params: {
      team_id: string
    }
  }>, reply: FastifyReply) => {
    try {
      const {team_id} = request.params;

      if (!team_id ) {
        return reply
          .status(400)
          .send({ message: "Team not found" });
      }

      const teamMembers = await this.#model.index(team_id)

      return reply.send({ message: "Team members retrieved successfully",teamMembers});
      
    } catch (error) {
      if (env.NODE_ENV === "dev") {
        console.log(error);
      }
      throw error;
    }
  }

  // Add a new team member to a team
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
          .send({ message: "Team Or Member was not found" });
      }

      const teamMemberCreated = await this.#model.create(team_id, user_id);

      if (!teamMemberCreated) {
        return reply.status(500).send({ message: "Failed to add team member" });
      }

      return reply.send({ message: "Team member added successfully" });
    } catch (error) {
      if (env.NODE_ENV === "dev") {
        console.log(error);
      }
      throw error;
    }
  };

  // Delete a team member of a team
  delete = async (
    request: FastifyRequest<{ Params: { team_id: string; user_id: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { team_id, user_id } = request.params;

      if (!team_id || !user_id) {
        return reply
          .status(400)
          .send({ message: "Team Or Member was not found" });
      }

      const teamMember = await this.#model.delete(team_id, user_id);

      if (!teamMember) {
        return reply
          .status(500)
          .send({ message: "Failed to delete a team member" });
      }

      return reply.status(204).send();
    } catch (error) {
      if (env.NODE_ENV === "dev") {
        console.log(error);
      }
      throw error;
    }
  };
}
