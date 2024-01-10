import { SignInButton, currentUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link';
import { Clapperboard } from 'lucide-react';

import { Button } from '@/components/ui/button';




import React from 'react'

type Props = {}

// This is a server component 
async function Actions({}: Props) {
    const user = await currentUser();

  return (
    <div className='flex items-center justify0end gap-x-2 ml-4 lg:ml-0'>
        {
            !user && (
                <SignInButton>
                    <Button
                        size='sm'
                        variant="primary"
                    >
                        Login
                    </Button>
                </SignInButton>
            )
        }
        {
            !!user && (
                <div className="flex items-center gap-x-4">
                    <Button
                        size="sm"
                        variant="ghost"
                        className='text-muted-foreground hover:text-primary'
                        asChild
                    >
                        <Link
                            href={`/u/${user.username}`}
                        >
                            <Clapperboard
                                className='h-5 w-5 lg:mr-2'
                            />
                            <span className='hidden lg:block'>
                                Dashboard
                            </span>
                        </Link>
                    </Button>
                    <UserButton
                        afterSignOutUrl='/'
                    />
                </div>
            )
        }
    </div>
  )
}

export default Actions