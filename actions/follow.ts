"use server"

import { revalidatePath } from "next/cache";

import { followUser, unfollowUser } from "@/lib/follow-service"

export const onFollow = async (id: string) => {
    try {
        const followedUser = await followUser(id);

        // This will refresh and revalidate the path
        revalidatePath("/");

        if (followedUser) {
            // This will revalidate the user page after following, so the followers get updated
            revalidatePath(`/${followedUser.following.username}`);
        }

        return followedUser
        
    } catch (error) {
        throw new Error(`Internal Error`)
    }
}

export const onUnfollow = async (id: string) => {
    try {
        const unfollowedUser = await unfollowUser(id);

        revalidatePath("/");

        if (unfollowedUser) {
            revalidatePath(`/${unfollowedUser.following.username}`)
        }

        return unfollowedUser
    } catch (error) {
        throw new Error("Internal Error")
    }
}