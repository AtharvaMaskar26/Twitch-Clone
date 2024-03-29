import { db } from "./db";
import { getSelf } from "./auth-service";

export const getFollowedUsers = async () => {
    try {
        const self = await getSelf();

        const followedUser = db.follow.findMany({
            where: {
                followerId: self.id,
                // To highlight that the channel we are following is not blocking the user
                following: {
                    blocking: {
                        none: {
                            blockedId: self.id
                        }
                    }
                }
            },
            include: {
                following: {
                    include: {
                        stream: {
                            select: {
                                isLive: true,
                            }
                        },
                    },
                },
            },
        });

        return followedUser
    } catch {
        return []
    }
}

export const isFollowingUser = async (id:string) => {
    try {
        const self = await getSelf();

        const otherUser = await db.user.findUnique({
            where: {id}, 
        });

        if (!otherUser) {
            throw new Error("User not found")
        }

        if (otherUser.id === self.id) {
            return true;
        }

        const existingFollow = await db.follow.findFirst({
            where: {
                followerId: self.id, 
                followingId: otherUser.id
            }
        })

        return !!existingFollow

    } catch {
        return false
    }
}


export const followUser = async (id: string) => {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where: {id}, 
    });

    if (!otherUser) {
        throw new Error("User not found")
    }

    if (otherUser.id === self.id) {
        throw new Error("Cannot Follow Yourself")
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id, 
            followingId: otherUser.id,
        },
    });

    if (existingFollow) {
        throw new Error("Already Following");
    }

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id
        }, 
        include: {
            following: true, 
            follower: true
        }
    })

    return follow
}

export const unfollowUser = async(id: string) => {
    const self = await getSelf();
    
    const otherUser = await db.user.findUnique({
        where: {
            id,
        },
    });

    if (!otherUser) {
        throw new Error("User does not Exist");
    }

    if (otherUser.id === self.id) {
        throw new Error("You cannot unfollow yourself")
    }

    // Checks if we are followin the user or not to unfollow
    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id, 
            followingId: otherUser.id
        },
    });

    if (!existingFollow) {
        throw new Error("Not following!");
    }

    const follow = await db.follow.delete({
        where: {
            id: existingFollow.id
        },
        include: {
            following: true
        }
    });

    return follow;

}
