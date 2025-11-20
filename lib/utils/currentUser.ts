import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const userCurrent = async () =>{
    const user = await currentUser()

    if(!user) redirect("sign-in")

    return user
}