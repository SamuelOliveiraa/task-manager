import { prisma } from "@/lib/prisma.ts";

export class TeamModel {
  async index() {
    const teams = await prisma.teams.findMany();

    if (teams.length === 0) return [];

    return teams;
  }

  async create(name: string, description?: string) {
    const team = await prisma.teams.create({
      data: { name, description: description ?? null }
    });

    if (!team || !team.id) return null;

    return team;
  }
}
