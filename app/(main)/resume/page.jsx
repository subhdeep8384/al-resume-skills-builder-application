import { getResume } from '@/actions/resume'
import React from 'react'
import ResumeBuilder from './_components/ResumeBuilder'

const Page = async () => {
  const resume = await  getResume()
  return (
    <div className='container mx-auto py-6'>
      <ResumeBuilder initialContent={resume?.content}></ResumeBuilder>
    </div>
  )
}

export default Page
