import { env } from "@/env/index.ts";
import type { Priority, Status } from "@/generated/prisma/enums.ts";
import { TasksModel } from "@/models/TasksModel.ts";
import type { FastifyReply, FastifyRequest } from "fastify";
import { request } from "node:http";

export class TasksController {
  #model: TasksModel;

  constructor() {
    this.#model = new TasksModel();
  }

  // Read all tasks
  index = async (request: FastifyRequest<{Querystring: {
    status?: Status,
    priority?: Priority
  }}>, reply: FastifyReply) => {
    try {
      const {priority, status} = request.query

      const tasks = await this.#model.index(priority, status);
      
      return reply.send({ message: "All Tasks", tasks: tasks });
    } catch (error) {
      if (env.NODE_ENV === "dev") {
        console.log(error);
      }
      throw error;
    }
  };
  
  // Read all tasks of a user
  show = async (request: FastifyRequest<{Params: {
    user_id: string,
  },Querystring: {
    status?: Status,
    priority?: Priority
  }}>, reply: FastifyReply) => {
    try {
      const { priority, status } = request.query
      const { user_id } = request.params

      const isUserAuthorized = request.user.id === user_id || request.user.role === 'admin'
      
      if(!isUserAuthorized){
        return reply.status(404).send({message: "Unathorized"})
      }
      
      const tasks = await this.#model.show(user_id, priority, status);
      
      return reply.send({ message: "All Tasks", tasks: tasks });
    } catch (error) {
      if (env.NODE_ENV === "dev") {
        console.log(error);
      }
      throw error;
    }
  };

//   // Create a new teams
//   store = async (
//     request: FastifyRequest<{
//       Body: {
//         name: string;
//         description?: string;
//       };
//     }>,
//     reply: FastifyReply
//   ) => {
//     try {
//       const { name, description } = request.body;

//       if (!name || !description) {
//         return reply
//           .status(400)
//           .send({ message: "Name or description are required" });
//       }

//       const team = await this.#model.create(name, description);

//       if (!team) {
//         return reply.status(500).send({ message: "Failed to create team" });
//       }

//       return reply.send({ message: "Team created successfully" });
//     } catch (error) {
//       if (env.NODE_ENV === "dev") {
//         console.log(error);
//       }
//       throw error;
//     }
//   };

  // Delete a Task
  delete = async (
    request: FastifyRequest<{ Params: { task_id: string, user_id: string} }>,
    reply: FastifyReply
  ) => {
    try {
      const { task_id, user_id} = request.params;

      if (!task_id) {
        return reply.status(400).send({ message: "Task was not found" });
      }

      const isUserAuthorized = request.user.id === user_id || request.user.role === 'admin'
      
      if(!isUserAuthorized){
        return reply.status(404).send({message: "Unathorized"})
      }

      const task = await this.#model.delete(task_id);

      if (!task) {
        return reply.status(500).send({ message: "Failed to delete a task" });
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
