
import { getIndustryInsights } from '@/actions/dashboard'
import { getUserOnBoardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async () => {
  const { isOnboarded }  = await getUserOnBoardingStatus()

  if(!isOnboarded){redirect("/onboarding")}
  const data = await getIndustryInsights()


    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Salary Ranges</h2>
        <ul className="space-y-2">
          {data.salaryRanges.map((job, index) => (
            <li key={index} className="p-2 border rounded">
              <p className="font-semibold">{job.role} ({job.location})</p>
              <p>Min: ${job.min.toLocaleString()}</p>
              <p>Max: ${job.max.toLocaleString()}</p>
              <p>Median: ${job.median.toLocaleString()}</p>
            </li>
          ))}
        </ul>
  
        <p><strong>Growth Rate:</strong> {data.growthRate}%</p>
        <p><strong>Demand Level:</strong> {data.demandLevel}</p>
        <p><strong>Market Outlook:</strong> {data.marketOutlook}</p>
  
        <div>
          <h3 className="font-bold">Top Skills:</h3>
          <ul className="list-disc list-inside">
            {data.topSkills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
  
        <div>
          <h3 className="font-bold">Key Trends:</h3>
          <ul className="list-disc list-inside">
            {data.keyTrends.map((trend, i) => (
              <li key={i}>{trend}</li>
            ))}
          </ul>
        </div>
  
        <div>
          <h3 className="font-bold">Recommended Skills:</h3>
          <ul className="list-disc list-inside">
            {data.recommendedSkills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
  )
}

export default Page
