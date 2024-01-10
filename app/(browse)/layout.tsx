import React from 'react'

// Importing Components 
import Navbar from './_components/navbar'
import Sidebar from './_components/sidebar'
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
            <Sidebar />
            <Container>
              {children}
            </Container>
        </div>
    </div>
  )
}

export default layout