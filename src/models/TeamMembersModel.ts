import { prisma } from "@/lib/prisma.ts";

export class TeamMembersModel {
  async index(team_id: string) {
    const teamMembers = await prisma.teamMembers.findMany({
      where: {
        team_id,
      },
      select: {
        team: {
          select: {
            name: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });

    if (!teamMembers) return [];

    return teamMembers;
  }


  async create(team_id: string, user_id: string) {
    const teamMemberCreated = await prisma.teamMembers.create({
      data: {
        team_id,
        user_id
      }
    });

    if (!teamMemberCreated || !teamMemberCreated.id) return null;

    return teamMemberCreated;
  }

  async delete(team_id: string, user_id: string) {
    const teamMemberSelected = await prisma.teamMembers.findFirst({
      where: {
        AND: [{ team_id }, { user_id }]
      }
    });

    if (!teamMemberSelected) return null;

    const memberDeleted = await prisma.teamMembers.delete({
      where: {
        id: teamMemberSelected?.id
      }
    });

    if (!memberDeleted) return null;

    return memberDeleted;
  }
}
