import React from 'react'

import Wrapper from './Wrapper'
import Toggle from './toggle'
import Navigation from './navigation'

type Props = {}

function Sidebar({}: Props) {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  )
}

export default Sidebar