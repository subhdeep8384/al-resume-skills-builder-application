import React, { Suspense } from 'react'
import {BarLoader} from 'react-spinners'

const Layout = ({children}) => {
  return (
     <div className='px-5 mt-20'>
        
     <Suspense fallback={<BarLoader className='mt-20' width={"100%"}  color='gray' />}>
    {children}
      </Suspense>
    </div>
  )
}

export default Layout
