"use server"

import { Stream } from "@prisma/client"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { getSelf } from "@/lib/auth-service"

export const updateStream = async(values: Partial<Stream>) => {
    try {   
        const self = await getSelf();
        const SelfStream = await db.stream.findUnique({
            where: {
                userId: self.id,
            }
        })

        if (!SelfStream) {
            throw new Error("Stream not found!")
        }

        const validData = {
            name: values.name,
            isChatEnabled: values.isChatEnabled, 
            isChatFollowersOnly: values.isChatFollowersOnly, 
            isChatDelayed: values.isChatDelayed
        };

        const stream = await db.stream.update({
            where: {
                id: SelfStream.id,
            }, 
            data: {
                ...validData,
            }
        });

        revalidatePath(`/u/${self.username}/chat`)
        revalidatePath(`/u/${self.username}`)
        revalidatePath(`/${self.username}`)


        return stream;

    } catch {
        throw new Error("Internal Error")
    }
}
