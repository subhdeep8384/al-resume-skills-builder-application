import { getUserOnBoardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async () => {
  const { isOnboarded }  = await getUserOnBoardingStatus()

  if(!isOnboarded){redirect("/onboarding")}
  return (
    <div className='mt-67'>
      lund
    </div>
  )
}

export default Page
