import React from 'react'

interface ErrorProps {
  message: string
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div style={{ color: "red", fontWeight: "bold" }}>{message}</div>
  )
}
