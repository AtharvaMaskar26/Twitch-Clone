"use client"
import React from 'react'

import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/user-creator-sidebar'


interface WrapperProps {
    children: React.ReactNode
}

function Wrapper({
    children
}: WrapperProps) {
    const {collapsed} = useCreatorSidebar((state) => state);

  return (
    <aside className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg:background border-r border-[#2D2E35] Z-50", 
        collapsed && "w-[70px]"
    )}>
        {children}
    </aside>
  )
}

export default Wrapper