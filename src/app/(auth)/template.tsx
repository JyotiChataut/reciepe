import React from 'react'

import { ReactNode } from 'react'

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>{children}
      <div>
         Auth pages
      </div>
    
    </div>
  )
}

export default AuthLayout