import prisma from "@/lib/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Layout({
  params,
}: {
  params: Promise<{ inviteCode: string }>;
}) {
  const { inviteCode } = await params;
  const user = await currentUser();

  if (!inviteCode) redirect("/");
  if (!user) redirect("sign-in");

  const server = await prisma.server.findFirst({
    where: {
      inviteCode: inviteCode,
      ...(inviteCode && {
        members: {
          some: {
            profileId: user.id,
          },
        },
      }),
    },
  });

  if (server) redirect(`/servers/${server.id}/x`);

  const newMember = await prisma.server.update({
    where: {
      inviteCode: inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: user.id,
            role: MemberRole.GUEST,
          },
        ],
      },
    },
  });

  if (!server) if (newMember) redirect(`/servers/${server!.id}/x`);

  return null;
}
