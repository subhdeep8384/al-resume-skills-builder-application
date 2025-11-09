"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy } from 'lucide-react'
import  { useEffect, useState } from 'react'

const StatsCard = ({ assessment }) => {
  
  const [averageScore , setAverageScore] = useState(0)
  const [totalQuestions , setTotalQuestions] = useState(0)
  const [latestScore , setLatestScore] = useState(0)

  const getAverageScore = () => {
    if (!assessment || !assessment.length) return null
   
    const total = assessment.reduce((sum  , ass) => {
      console.log("ass.quizScore is : " ,ass.quizScore)
      return ass.quizScore + sum 
    }, 0 )
    const sum = total / assessment.length
    return sum * 100
  }

  const getLatestAssessment = () => {
    if (!assessment || !assessment.length) return null
    return assessment[0]
  }

  const getTotalQuestions = () => {
    if (!assessment || !assessment.length) return null
    return assessment.reduce((sum, ass) => {
      return (sum + ass.questions.length)
    }, 0)
  }
  useEffect(() => {
    if (assessment && assessment.length) {
      setAverageScore(getAverageScore())
      setTotalQuestions(getTotalQuestions())
      setLatestScore(getLatestAssessment().quizScore)
    }
  }, [assessment])


  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-5 w-full'>
      <Card className="shadow-sm border border-gray-200 mt-8 ">
        <CardHeader className="flex items-center pb-2">
          <CardTitle className="flex items-center justify-between w-full font-bold text-3xl gap-2">
            <span>Average Score</span>
            <Trophy />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-xl  mt-2">{averageScore}</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-gray-200 mt-8 ">
        <CardHeader className="flex items-center pb-2">
          <CardTitle className="flex items-center justify-between w-full font-bold text-3xl gap-2">
            <span>Question Practiced </span>
            <Trophy />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-xl  mt-2">{totalQuestions}</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-gray-200 mt-8 ">
        <CardHeader className="flex items-center pb-2">
          <CardTitle className="flex items-center justify-between w-full font-bold text-3xl gap-2">
            <span>Latest Score </span>
            <Trophy />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-xl  mt-2">{latestScore}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatsCard
