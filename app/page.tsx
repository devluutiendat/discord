import InitiaModal from "@/components/modals/initia-modal";

import prisma from "@/lib/utils/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
async function SetupPage() {
  const user = await currentUser();

  if (!user) return redirect("/sign-in");

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
    where: { members: { some: { profileId: user.id } } },
  });

  if (server) return redirect(`/server/${server.id}`);
  return <InitiaModal />;
}

export default function page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SetupPage />
      </Suspense>
    </>
  );
}
