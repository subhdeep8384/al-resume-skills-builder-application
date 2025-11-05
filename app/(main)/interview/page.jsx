import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import StatsCard from './_components/StatsCard'
import { getAssessment } from '@/actions/interview'
import PerformanceChart from './_components/PerformanceChart'
import QuizList from './_components/QuizList'

const Page =  async  () => {

  const assessment = await getAssessment()
  return (
    <div>
      <div>
      <h1 className='text-6xl font-bold gradient-text mb-5'>Interview Perparation</h1>

      <div>
        <StatsCard assessment={assessment} />
        <PerformanceChart assessment={assessment} />
        <QuizList assessment={assessment} />
      </div>
      </div>
    </div>
  )
}

export default Page
