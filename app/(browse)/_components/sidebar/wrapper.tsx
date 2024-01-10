"use client"

import { cn } from "@/lib/utils"

import { ToggleSkeleton } from "./toggle"
import { RecommendedSkeleton } from "./recommended"

import { useSidebar } from "@/store/use-sidebar"
import { useEffect, useState } from "react"

interface WrapperProps {
    children: React.ReactNode
};

export const Wrapper = ({
    children,
}: WrapperProps) => {
    const {collapsed} = useSidebar((state) => state);
    const [isClient, setIsClient] = useState(false);

    // Use effect only happens at the client side so this is a good way to change from false to true
    useEffect(() => {
        setIsClient(true);
    }, [])

    // Here we totally skip server side rendering
    // This one takes care of server side rendering and is completely different from the skeleton in Layout. This is only here to solve the hydration error we got. 
    if (!isClient) {
        return (
            <aside
                className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50"
            >
                <ToggleSkeleton />
                <RecommendedSkeleton />
            </aside>
        )
    }
    return (
        <aside
            className={cn("fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50", 
            collapsed && "w-[70px]"
            )}
        >
            {children}
        </aside>
    )
}