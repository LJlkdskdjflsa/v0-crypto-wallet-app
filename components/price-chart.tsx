"use client"

import { useEffect, useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PriceChartProps {
  timeframe: string
  tokenSymbol: string
  isPositive: boolean
}

export function PriceChart({ timeframe, tokenSymbol, isPositive }: PriceChartProps) {
  const [data, setData] = useState<any[]>([])
  const [chartType, setChartType] = useState<string>("area")
  const [showMA50, setShowMA50] = useState<boolean>(true)
  const [showMA200, setShowMA200] = useState<boolean>(false)
  const [showSupport, setShowSupport] = useState<boolean>(true)
  const [showResistance, setShowResistance] = useState<boolean>(true)

  useEffect(() => {
    // Generate mock data based on timeframe
    const generateData = () => {
      const newData = []
      let points = 0

      switch (timeframe) {
        case "1d":
          points = 24
          break
        case "1w":
          points = 7
          break
        case "1m":
          points = 30
          break
        case "1y":
          points = 12
          break
        case "max":
          points = 5
          break
        default:
          points = 24
      }

      // Create a base value and add some randomness
      const baseValue =
        tokenSymbol === "BTC" ? 60000 : tokenSymbol === "ETH" ? 3500 : tokenSymbol === "SOL" ? 120 : 0.12

      const volatility = tokenSymbol === "DOGE" ? 0.15 : 0.05

      // Create a trend based on whether the price is positive or negative
      const trend = isPositive ? 1 : -1

      // Calculate moving averages
      const ma50Window = 50
      const ma200Window = 200
      const prices = []

      // Generate initial price data
      for (let i = 0; i < points + Math.max(ma50Window, ma200Window); i++) {
        const randomFactor = 1 + (Math.random() * volatility - volatility / 2)
        const trendFactor = 1 + (trend * i * volatility) / points
        prices.push(baseValue * randomFactor * trendFactor)
      }

      // Calculate support and resistance levels
      const allPrices = [...prices]
      const sortedPrices = [...allPrices].sort((a, b) => a - b)
      const supportLevel = sortedPrices[Math.floor(sortedPrices.length * 0.2)]
      const resistanceLevel = sortedPrices[Math.floor(sortedPrices.length * 0.8)]

      // Create the final data with moving averages
      for (let i = 0; i < points; i++) {
        const currentIndex = i + Math.max(ma50Window, ma200Window)
        const price = prices[currentIndex]

        // Calculate MA50
        let ma50Sum = 0
        for (let j = 0; j < ma50Window; j++) {
          ma50Sum += prices[currentIndex - j]
        }
        const ma50 = ma50Sum / ma50Window

        // Calculate MA200
        let ma200Sum = 0
        for (let j = 0; j < ma200Window; j++) {
          ma200Sum += prices[currentIndex - j]
        }
        const ma200 = ma200Sum / ma200Window

        // Add random volume
        const volume = Math.random() * price * 0.1

        newData.push({
          time: i.toString(),
          value: price,
          ma50,
          ma200,
          volume,
          supportLevel,
          resistanceLevel,
        })
      }

      return newData
    }

    setData(generateData())
  }, [timeframe, tokenSymbol, isPositive])

  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}k`
    }
    return `$${value.toFixed(2)}`
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="area" onValueChange={setChartType} className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="area">Area</TabsTrigger>
          <TabsTrigger value="candle">Line</TabsTrigger>
          <TabsTrigger value="volume">Volume</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setShowMA50(!showMA50)}
          className={`text-xs px-2 py-1 rounded ${
            showMA50 ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          MA50
        </button>
        <button
          onClick={() => setShowMA200(!showMA200)}
          className={`text-xs px-2 py-1 rounded ${
            showMA200 ? "bg-purple-500 text-white" : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          MA200
        </button>
        <button
          onClick={() => setShowSupport(!showSupport)}
          className={`text-xs px-2 py-1 rounded ${
            showSupport ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          Support
        </button>
        <button
          onClick={() => setShowResistance(!showResistance)}
          className={`text-xs px-2 py-1 rounded ${
            showResistance ? "bg-red-500 text-white" : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          Resistance
        </button>
      </div>

      <div className="h-[200px] w-full">
        {chartType === "area" && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                    stopOpacity={0.3}
                  />
                  <stop offset="95%" stopColor={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
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
                formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
                labelFormatter={(label) => `Time: ${label}`}
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
              {showMA50 && <Line type="monotone" dataKey="ma50" stroke="#3b82f6" dot={false} strokeWidth={2} />}
              {showMA200 && <Line type="monotone" dataKey="ma200" stroke="#8b5cf6" dot={false} strokeWidth={2} />}
              {showSupport && (
                <ReferenceLine
                  y={data[0]?.supportLevel}
                  stroke="rgb(34, 197, 94)"
                  strokeDasharray="3 3"
                  label={{ value: "Support", position: "insideBottomRight", fill: "rgb(34, 197, 94)", fontSize: 10 }}
                />
              )}
              {showResistance && (
                <ReferenceLine
                  y={data[0]?.resistanceLevel}
                  stroke="rgb(239, 68, 68)"
                  strokeDasharray="3 3"
                  label={{ value: "Resistance", position: "insideTopRight", fill: "rgb(239, 68, 68)", fontSize: 10 }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        )}

        {chartType === "candle" && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
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
                formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
                labelFormatter={(label) => `Time: ${label}`}
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                dot={false}
                strokeWidth={2}
              />
              {showMA50 && <Line type="monotone" dataKey="ma50" stroke="#3b82f6" dot={false} strokeWidth={2} />}
              {showMA200 && <Line type="monotone" dataKey="ma200" stroke="#8b5cf6" dot={false} strokeWidth={2} />}
              {showSupport && (
                <ReferenceLine
                  y={data[0]?.supportLevel}
                  stroke="rgb(34, 197, 94)"
                  strokeDasharray="3 3"
                  label={{ value: "Support", position: "insideBottomRight", fill: "rgb(34, 197, 94)", fontSize: 10 }}
                />
              )}
              {showResistance && (
                <ReferenceLine
                  y={data[0]?.resistanceLevel}
                  stroke="rgb(239, 68, 68)"
                  strokeDasharray="3 3"
                  label={{ value: "Resistance", position: "insideTopRight", fill: "rgb(239, 68, 68)", fontSize: 10 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        )}

        {chartType === "volume" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
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
                formatter={(value: number) => [`$${value.toFixed(2)}`, "Volume"]}
                labelFormatter={(label) => `Time: ${label}`}
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="volume" fill={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
