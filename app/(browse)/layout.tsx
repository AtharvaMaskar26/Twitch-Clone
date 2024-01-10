import React from 'react'
import { Suspense } from 'react'

// Importing Components 
import Navbar from './_components/navbar'
import Sidebar, { SidebarSkeleton } from './_components/sidebar'
import {Container} from './_components/container'


type Props = {}

function layout({
    children
}: {
    children: React.ReactNode
}) {
  return (
    <div>
        <Navbar />
        <div className="flex h-full pt-20">
          {/* This skeleton will be shown while getRecommended function is loading */}
          <Suspense
            fallback={<SidebarSkeleton/>}
          >
            <Sidebar />
          </Suspense>
            <Container>
              {children}
            </Container>
        </div>
    </div>
  )
}

export default layout