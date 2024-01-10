import React from 'react'

// Importing Component 
import Logo from './logo'
import Actions from './actions'

type Props = {}

function Navbar({}: Props) {
  return (
    <div className='fixed top-0 w-full h-20 x-[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm'>
        <Logo />
        <Actions />

    </div>
  )
}

export default Navbar