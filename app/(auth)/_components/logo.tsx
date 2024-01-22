import React from 'react'
import Image from 'next/image'
import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"]

})
type Props = {}

const Logo = (props: Props) => {
  return (
    <div className='flex flex-col items-center gap-y-4'>
        {/* Our image was black in colour, so what we do is, create a white circle with padding 1 and put our black logo inside it. So it looks better */}
        <div className="bg-white rounded-full p-1">
            <Image
                src={'/spooky.svg'}
                alt='GameHub'
                height={"80"}
                width={"80"}
            />
        </div>
        <div className={cn(
            "flex flex-col items-center", 
            font.className
        )}>
            <p className="text-xl font-semibold">
                GameHub
            </p>
            <p
                className="text-sm text-muted-foreground">
                Let&apos;s Play
            </p>
        </div>
    </div>
  )
}

export default Logo