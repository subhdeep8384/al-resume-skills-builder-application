import React from 'react'

const MainLayout = ({children}) => {
    // redirect user after onboarding 
  return (
    <div className='conatainer mx-auto mt-24 mb-20'>
      {children}
    </div>
  )
}

export default MainLayout
