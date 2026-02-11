import type { FastifyInstance } from "fastify";
import { addMemberRoute } from "./add-member";
import { leaveMemberRoute } from "./leave-member";
import { listMembersRoute } from "./list-members";
import { removeMemberRoute } from "./remove-member";

export async function membersRoutes(app: FastifyInstance) {
  await app.register(listMembersRoute);
  await app.register(addMemberRoute);
  await app.register(removeMemberRoute);
  await app.register(leaveMemberRoute);
}
