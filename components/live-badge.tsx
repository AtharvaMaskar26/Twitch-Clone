import React from 'react'

import { cn } from '@/lib/utils'

// Here we are taking classname as prop because we sometimes want to accept classname as props
interface LiveBadgeProps {
    classname?: string;
}

function LiveBadge({
    classname
}: LiveBadgeProps) {
  return (
    <div
        className={cn(
            "bg-rose-500  text-center p-0.5 px-1.5 rounded-md uppercase text-[10px] border border-backgroud font-semibold tracking-wide",
            classname, 
            // Along with defined classnames we also use the classname we accepted as a prop
        )}
    >Live</div>
  )
}

export default LiveBadge