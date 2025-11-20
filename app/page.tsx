import prisma from "@/lib/utils/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";
import ServerModal from "@/components/modals/serverModal";
import { userCurrent } from "@/lib/utils/currentUser";
async function SetupPage() {
  const user = await userCurrent();

  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
  });
  if (!profile) {
    await prisma.profile.create({
      data: {
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        imageUrl: user.imageUrl ?? "",
      },
    });
  }
  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: { profileId: user.id },
      },
    },
    select: {
      id: true,
      channels: {
        orderBy: { createdAt: "asc" },
        take: 1,
        select: { id: true },
      },
    },
  });

  if (server)
    return redirect(`/servers/${server.id}/${server.channels[0]?.id}`);
  return <ServerModal open={true} />;
}

export default function page() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <SetupPage />
      </Suspense>
    </>
  );
}
