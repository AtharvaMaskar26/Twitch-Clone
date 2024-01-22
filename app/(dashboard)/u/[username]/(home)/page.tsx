import { getUserByUsername } from '@/lib/user-service';
import { currentUser } from '@clerk/nextjs';
import React from 'react'

import {StreamPlayer} from '@/components/stream-player';

interface CreatorPageProps {
  params: {
    username: string;
  }
}

async function CreatorPage({
  params,
}: CreatorPageProps) {
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthroized");
  }


  return (
    <div className='h-full'>
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing={true}
      />
    </div>
  )
}

export default CreatorPage