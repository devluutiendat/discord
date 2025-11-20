"use server"

import { ChannelType } from "@prisma/client";
import prisma from "../utils/db";
import { userCurrent } from "../utils/currentUser";

export const createChannel = async (
    serverId : string,
    name : string,
    type : ChannelType
)=>{
    const user = await userCurrent()
    await prisma.channel.create({
        data:{
            serverId,
            name,
            type,
            profileId: user.id
        }
    })
};