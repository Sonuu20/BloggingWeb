import React from 'react'
import logo from "../assets/blog-logo.PNG"

function Logo({
  width = '100px',
  className = ''
}) {
  return (
    <div className='border-white rounded-sm '><img src={logo} width={width} className={` bg-gray-400 ${className}`} /></div>
  )
}

export default Logo