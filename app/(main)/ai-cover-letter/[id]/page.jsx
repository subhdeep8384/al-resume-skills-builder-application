import React from 'react'

const Page = async ({params}) => {
  const id = await params.id
  return (
    <div>
      copver leteer id ::::{id}
    </div>
  )
}

export default Page
