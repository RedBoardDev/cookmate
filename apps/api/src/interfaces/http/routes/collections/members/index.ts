import type { FastifyInstance } from "fastify";
import { listMembersRoute } from "./list-members";
import { addMemberRoute } from "./add-member";
import { removeMemberRoute } from "./remove-member";

export async function membersRoutes(app: FastifyInstance) {
  await app.register(listMembersRoute);
  await app.register(addMemberRoute);
  await app.register(removeMemberRoute);
}
