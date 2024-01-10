import React from 'react'
import { SignUp } from '@clerk/nextjs'

type Props = {}

function SignUpPage({}: Props) {
  return (
    <div>
        <SignUp />
    </div>
  )
}

export default SignUpPage