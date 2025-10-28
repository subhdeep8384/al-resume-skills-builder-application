
import { getIndustryInsights } from '@/actions/dashboard'
import Dashboard from './_components/dashboard-view'
import { getUserOnBoardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'


const Page = async () => {
  const { isOnboarded }  = await getUserOnBoardingStatus()
  if(!isOnboarded){redirect("/onboarding")}
  const insights = await getIndustryInsights()

  return (
    <div>
      <Dashboard insights={insights}></Dashboard>
    </div>
  ) 
}

export default Page
