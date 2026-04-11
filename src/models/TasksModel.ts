import { prisma } from "@/lib/prisma.ts";
import type { Priority, Status } from "@/generated/prisma/enums.ts";

export class TasksModel {
  async index(priority?: Priority, status?: Status) {
    const tasks = await prisma.tasks.findMany({
      where: {
        ...(priority ? {priority} : {}),
        ...(status ? {status} : {})
      },
      select: {
        id: true,
        title: true,
        description: true,
        priority: true,
        status: true,
        createdAt: true,
        team: {
          select: {
            id: true,
            name: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    if (tasks.length === 0) return [];

    return tasks
  }

  // async create(name: string, description?: string) {
  //   const team = await prisma.teams.create({
  //     data: { name, description: description ?? null }
  //   });

  //   if (!team || !team.id) return null;

  //   return team;
  // }

  async delete(task_id: string) {
    const taskDeleted = await prisma.tasks.delete({
      where: {
        id: task_id
      }
    })

    if (!taskDeleted) return null;

    return taskDeleted;
  }
}
