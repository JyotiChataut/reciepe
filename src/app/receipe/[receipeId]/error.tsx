'use client'
import React from 'react'

interface ProductByIdErrorProps {
  error: { message: string }
}

function ProductByIdError({ error }: ProductByIdErrorProps) {
  return (
    <div>{error.message}</div>
  )
}

export default ProductByIdError