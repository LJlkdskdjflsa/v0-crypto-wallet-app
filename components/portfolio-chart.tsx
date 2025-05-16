"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface PortfolioChartProps {
  timeframe: string
}

export function PortfolioChart({ timeframe }: PortfolioChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Generate mock data based on timeframe
    const generateData = () => {
      const newData = []
      let points = 0
      let format = ""

      switch (timeframe) {
        case "1w":
          points = 7
          format = "ddd"
          break
        case "1m":
          points = 30
          format = "DD"
          break
        case "3m":
          points = 90
          format = "MMM DD"
          break
        case "1y":
          points = 12
          format = "MMM"
          break
        case "all":
          points = 24
          format = "MMM YY"
          break
        default:
          points = 30
          format = "DD"
      }

      // Create a base value and add some randomness with an upward trend
      const baseValue = 42000
      const volatility = 0.05
      const trend = 0.01

      for (let i = 0; i < points; i++) {
        const randomFactor = 1 + (Math.random() * volatility - volatility / 2)
        const trendFactor = 1 + trend * i

        newData.push({
          time: i.toString(),
          value: baseValue * randomFactor * trendFactor,
        })
      }

      return newData
    }

    setData(generateData())
  }, [timeframe])

  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`
    }
    return `$${value.toFixed(0)}`
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <defs>
          <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgb(34, 197, 94)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="rgb(34, 197, 94)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} dy={10} />
        <YAxis
          domain={["auto", "auto"]}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10 }}
          tickFormatter={formatYAxis}
          dx={-10}
        />
        <Tooltip
          formatter={(value: number) => [`$${value.toFixed(2)}`, "Portfolio Value"]}
          labelFormatter={(label) => `Time: ${label}`}
          contentStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            border: "none",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        />
        <Area type="monotone" dataKey="value" stroke="rgb(34, 197, 94)" fillOpacity={1} fill="url(#colorPortfolio)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
