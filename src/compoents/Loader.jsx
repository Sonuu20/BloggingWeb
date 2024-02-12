import React from 'react'

function Loader() {
  return (
    <div>
        <div className='w-4 rounded-full bg-[#33BBCF]'></div>
        <div className='w-4 rounded-full bg-[#33BBCF] animate-bounce'></div>
        <div  class="w-4 h-4 rounded-full bg-[#33BBCF] animate-bounce [animation-delay:-.5s]"></div>
    </div>
  )
}

export default Loader