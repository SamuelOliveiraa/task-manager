import z from "zod";

const userSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    email: z.email(),
    role: z.enum(['member', 'admin']),
    // teams: z.array(),

    emailVerified: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date()



//   teams         TeamMembers[]
//   tasks         Tasks[]
//   tasks_history  TasksHistory[]

//   sessions      Session[]
//   accounts      Account[]
})

const teamsSchema = z.object({
    id: z.uuid(),
})


type UserType = z.input<typeof userSchema>;