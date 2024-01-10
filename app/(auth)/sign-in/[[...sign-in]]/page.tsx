import React from 'react'
import { SignIn } from '@clerk/nextjs'

type Props = {}

function SignInPage({}: Props) {
  return (
    <div>
      <SignIn />
    </div>
  )
}

export default SignInPage