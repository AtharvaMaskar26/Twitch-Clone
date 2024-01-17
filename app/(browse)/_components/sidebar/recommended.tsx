"use client"

import React from 'react'
import { User } from '@prisma/client'

import { UserItemSkeleton } from './user-item'

import { useSidebar } from '@/store/use-sidebar'

import UserItem from './user-item'

interface RecommendedProps {
  data: (User & {
    stream: {isLive: boolean} | null;
  })[];
}

function Recommended({
  data,
}: RecommendedProps) {
  const {collapsed} = useSidebar((state) => state);

  // Returns if sidebar is not collapsed and there are more than 0 users
  const showLabel = !collapsed && data.length > 0;
  console.log(data.length);
  


  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className='text-sm text-muted-foreground'>
            Recommended
          </p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {
          data.map((user) => {
            return (
              <UserItem
                key={user.id}
                username={user.username}
                imageUrl={user.imageUrl}
                isLive={user.stream?.isLive}
              />
            )
          })
        }
      </ul>
    </div>
  )
}

export const RecommendedSkeleton = () => {
  return (
      <ul className="px-2 my-2">
          { 
              [...Array(3)].map((_, i) => {
                  return (
                      <UserItemSkeleton
                      key={i}
                  /> 
                  )
              })
          }
      </ul>
  )
}

export default Recommended