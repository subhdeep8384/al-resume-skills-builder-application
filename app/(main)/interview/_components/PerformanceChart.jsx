"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { Trophy } from "lucide-react"
import React, { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const PerformanceChart = ({ assessment }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (assessment) {
      const formattedData = assessment.map((ass) => ({
        date: format(new Date(ass.createdAt), "MMM dd"),
        score: ass.quizScore,
      }))
      setChartData(formattedData)
    }
  }, [assessment])

  return (

    <div>
      <div>
      <h1 className='text-3xl font-bold gradient-text mb-5 mt-20'>Performance Trend</h1>
      </div>
      <Card className="shadow-sm border border-gray-200 mt-8 ">
        <CardHeader className="flex items-center pb-2">
          <CardTitle className="flex items-center justify-between w-full font-bold text-3xl gap-2">
            <span>Performace Trend</span>
            <Trophy/>
          </CardTitle>
        </CardHeader>

        <CardContent>
        <div className="w-full h-64 mt-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
        </CardContent>
      </Card>
    </div>

  )
}

export default PerformanceChart
