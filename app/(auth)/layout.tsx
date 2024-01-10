import React from 'react'

// Importing Components
import Logo from './_components/logo'

type Props = {}

function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
  return (
    // This centers the code
    <div className='h-full flex flex-col items-center justify-center space-y-6'>
      <Logo />
        {children}
    </div>
  )
}

export default AuthLayout