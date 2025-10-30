import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div>
      <div>
        <Button >
        <Link href='/interview/mock'>Go to quiz</Link>
        </Button>
      </div>
    </div>
  )
}

export default Page
