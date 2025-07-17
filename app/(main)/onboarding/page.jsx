import React from 'react'
import { industries } from '@/data/industries'
import Onboardingform from './_components/OnBoardingForm'
import { getUserOnBoardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'

const Page = async  () => {
  const { isOnboarded }  = await getUserOnBoardingStatus()

  if(isOnboarded){redirect("/dashboard")}
  return (
   <main>
    <Onboardingform industries={industries}/>
   </main>
  )
}

export default Page
