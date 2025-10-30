import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Quiz from '../_components/Quiz'

const Page = () => {
  return (
    <div className=''>
      <div className='flex flex-col space-y-2 mx-3'>
        <Link href={"/interview"}>
        <Button variant="link" className={`gap-2 pl-2`}>
          <ArrowLeft className='h-4 w-4'> </ArrowLeft>
          Back to interview preperation 
        </Button>
        </Link>

        <div className='flex items-center justify-between mb-5'>
         <h1 className='text-6xl font-bold gradient-text'>Interview Prepration</h1>
        </div>
      </div>

      <Quiz />
    </div>
  )
}

export default Page
