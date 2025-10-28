"use client"

import { BriefcaseIcon, LineChart, TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const Dashboard = ({ insights }) => {
  const salaryData = insights.salaryRanges.map((range) => ({
    role: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
    location: range.location,
  }))
  console.log(insights)
  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'bg-red-500 text-white'
      case 'medium':
        return 'bg-yellow-500 text-black'
      case 'low':
        return 'bg-green-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const getMarketOutlookColor = (outlook) => {
    switch (outlook.toLowerCase()) {
      case 'positive':
        return { icon: TrendingUp, color: 'text-green-500' }
      case 'neutral':
        return { icon: LineChart, color: 'text-gray-500' }
      case 'negative':
        return { icon: TrendingDown, color: 'text-red-500' }
      default:
        return { icon: LineChart, color: 'text-gray-400' }
    }
  }

  const { icon: OutLookIcon, color: outLookColor } = getMarketOutlookColor(insights.marketOutlook)

  const lastUpdateDate = format(new Date(insights.lastUpdated), 'dd/MMM/yyyy')
  const nextUpdateDate = formatDistanceToNow(new Date(insights.nextUpdate), { addSuffix: true })

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="space-y-7 p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h1 className="text-2xl font-semibold">{insights.industry}</h1>
          <Badge variant="outline" className="text-sm">
            Last updated: {lastUpdateDate}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Market Outlook */}
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle className="font-bold text-5xl flex items-center gap-5">
                Market Outlook
                <OutLookIcon className={`h-5 w-5 ${outLookColor}`} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-3xl font-bold capitalize">{insights.marketOutlook}</h2>
              <p className="text-sm text-muted-foreground mt-2">Next update: {nextUpdateDate}</p>
            </CardContent>
          </Card>

          {/* Industry Growth */}
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle className="text-5xl font-medium flex items-center gap-2">
                Industry Growth
                <TrendingUp className={`h-5 w-5 ${outLookColor}`} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-3xl font-bold">{insights.growthRate}%</h2>
              <p className="text-sm text-muted-foreground mt-2">Next update: {nextUpdateDate}</p>
              <Progress value={insights.growthRate} max={100} className="mt-3" />
            </CardContent>
          </Card>

          {/* Demand Level */}
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle className="text-5xl font-medium flex items-center gap-2">
                Demand Level
                <BriefcaseIcon className="h-5 w-5 text-gray-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-center text-lg font-semibold rounded-xl py-2 ${getDemandLevelColor(
                  insights.demandLevel
                )}`}
              >
                {insights.demandLevel}
              </div>
              <p className="text-sm text-muted-foreground mt-2">Next update: {nextUpdateDate}</p>
            </CardContent>
          </Card>

          {/* Top Skills */}
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle className="text-5xl font-medium flex items-center gap-2">
                Top Skills
                <BriefcaseIcon className="h-5 w-5 text-gray-600" />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap  gap-2">
              {insights.topSkills.map((skill) => (
                <Badge  key={skill} variant="secondary" className="text-sm whitespace-normal break-words max-w-[90%]">
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Salary Range Chart */}
      <Card className="shadow-sm border border-gray-200 m-4">
  <CardHeader>
    <CardTitle>Salary Range</CardTitle>
    <CardDescription>
      Display minimum, median, and maximum salaries (in thousands) for each role
    </CardDescription>
  </CardHeader>

  <CardContent>
    <div className="w-full h-[350px] sm:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={salaryData}
          margin={{ top: 20, right: 10, left: -10, bottom: 60 }}
          barGap={6}
          barCategoryGap="25%"
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis
            dataKey="role"
            angle={-35}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 10 }}
            height={60}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #ddd",
              backgroundColor: "white",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
            verticalAlign="bottom"
          />
          <Bar dataKey="min" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="median" fill="#34d399" radius={[4, 4, 0, 0]} />
          <Bar dataKey="max" fill="#fbbf24" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </CardContent>
</Card>


      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mb-10'>
        <Card>
          <CardHeader>
            <CardTitle>Key industry trends </CardTitle>
            <CardDescription>Current trend shaping the industry</CardDescription>

            <CardContent>
              <ul className="space-y-4">
                {insights.keyTrends.map((trend, index) => {
                  console.log(trend)
                  return (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                      <span>{trend}</span>
                    </li>
                  )
                })}
              </ul>
            </CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Skills</CardTitle>
            <CardDescription>Current trend shaping the industry</CardDescription>

            <CardContent>
              <ul className="space-y-4">
                {insights.recommendedSkills
                  .map((skill, index) => {
                    console.log(skill)
                    return (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                        <span>{skill}</span>
                      </li>
                    )
                  })}
              </ul>
            </CardContent>
          </CardHeader>
        </Card>
      </div>

    </div>
  )
}

export default Dashboard
