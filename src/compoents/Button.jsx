import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = '',
    className = '',
    ...props
}) {
  return (
    <button className={`px-2 py-3 select-none  ${className} ${textColor} ${bgColor}`} {...props}>{children}</button>
  )
}

export default Button