'use server'
import { MemberRole } from "@prisma/client";
import prisma from "../utils/db";

export async function getMembers(serverId: string) {
  const members = await prisma.member.findMany({
    where: {
      serverId: serverId,
    },
    include: {
      profile: true,
    },
  });

  return members;
}

export async function deleteMember(memberId: string) {
    await prisma.member.delete({
      where: {
        id : memberId
      },
    });
}

export async function updateMemberRole(
  memberId : string,
  role: MemberRole
) {  
     await prisma.member.update({
      where: {
        id : memberId
      },
      data: {
        role,
      },
    });
}
