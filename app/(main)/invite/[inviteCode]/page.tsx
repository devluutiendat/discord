import { userCurrent } from "@/lib/utils/currentUser";
import prisma from "@/lib/utils/db";
import { MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Layout({
  params,
}: {
  params: Promise<{ inviteCode: string }>;
}) {
  const { inviteCode } = await params;
  const user = await userCurrent();

  if (!inviteCode) redirect("/");

  const server = await prisma.server.findUnique({
    where: { inviteCode },
  });

  if (!server) redirect("/not-found");

  const existingMember = await prisma.member.findFirst({
    where: {
      serverId: server.id,
      profileId: user.id,
    },
  });

  if (existingMember) {
    redirect(`/servers/${server.id}/x`);
  }

  await prisma.member.create({
    data: {
      serverId: server.id,
      profileId: user.id,
      role: MemberRole.GUEST,
    },
  });

  redirect(`/servers/${server.id}/x`);
}
