"use client"

import { Button } from "@/components/ui/button"

import { onFollow, onUnfollow } from "@/actions/follow"
import { useTransition } from "react"

import { toast } from "sonner"
import { onBlock, onUnblock } from "@/actions/block"

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
    isBlocked: boolean
}

export const Actions = ({
    isFollowing,
    userId, 
    isBlocked
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch(() => toast.error("Something Went Wrong"))
        })
    }

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`You are no longer following ${data.following.username}`))
                .catch(() => toast.error("Something Went Wrong"))
        })
    }

    const onClick = () => {
        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    }

    const onClickBlock = () => {
        if (isBlocked) {
            handleUnblock();
        } else {
            handleBlock();
        }
    }

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => toast.success(`Blocked ${data.blocked.username}`))
                .catch(() => toast.error("Something Went Wrong"))
        })
    }

    const handleUnblock = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((data) => toast.success(`Unblocked ${data.blocked.username}`))
                .catch(() => toast.error("Something Went Wrong"))
        })
    }


    return (
        <>
            <Button
                variant='primary'
                // This disables the button for the duration where the funciton is being executed
                disabled={isPending}
                onClick={onClick}
            >
                {
                    isFollowing ? "Unfollow" : "Follow"
                }
            </Button>
            <Button
                onClick={onClickBlock}
                disabled={isPending}
            >
                {
                    isBlocked ? "Unblock" : "Block"
                }
            </Button>
        </>
    )
}