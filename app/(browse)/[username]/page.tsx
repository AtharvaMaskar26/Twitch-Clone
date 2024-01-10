import { isFollowingUser } from '@/lib/follow-service';
import { getUserByUsername } from '@/lib/user-service';
import { notFound } from 'next/navigation';
import React from 'react'

// Importing Components
import { Actions } from './_components/actions';
import { isBlockedByUser } from '@/lib/block-service';

interface UserPageProps {
    params: {
        // This means whatever string is passed in the url
        username: string;
    }
}

async function UserPage({
    params
}: UserPageProps) {
    const user = await getUserByUsername(params.username);

    // If user not found return the 404 page
    if (!user) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id)

  return (
    <div className='flex flex-col gap-y-4'>
        <p>Username: {user.username}</p>
        <p>User Id: {user.id}</p>
        <p>Is Following: {`${isFollowing}`}</p>
        <p>Is Blocked: {`${isBlocked}`}</p>
        <Actions
            userId={user.id}
            isFollowing={isFollowing}
            isBlocked={isBlocked}
        />
    </div>
  )
}

export default UserPage