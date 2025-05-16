"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BottomNav } from "@/components/bottom-nav"
import { PortfolioChart } from "@/components/portfolio-chart"
import { AllocationChart } from "@/components/allocation-chart"
import { PerformanceTable } from "@/components/performance-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AnalyticsView() {
  const [timeframe, setTimeframe] = useState("1m")

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-14 items-center">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-bold">Portfolio Analytics</h1>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 container pb-16">
        <div className="py-4">
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Portfolio Value</CardTitle>
                  <CardDescription>$54,718.13</CardDescription>
                </div>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1w">1 Week</SelectItem>
                    <SelectItem value="1m">1 Month</SelectItem>
                    <SelectItem value="3m">3 Months</SelectItem>
                    <SelectItem value="1y">1 Year</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <PortfolioChart timeframe={timeframe} />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Gain/Loss</p>
                  <p className="text-lg font-semibold text-green-500">+$12,345.67</p>
                  <p className="text-xs text-green-500">+29.1%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">24h Change</p>
                  <p className="text-lg font-semibold text-green-500">+$1,723.45</p>
                  <p className="text-xs text-green-500">+3.2%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">{timeframe.toUpperCase()} Change</p>
                  <p className="text-lg font-semibold text-green-500">+$5,678.90</p>
                  <p className="text-xs text-green-500">+11.6%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Current portfolio distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <AllocationChart />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
                <CardDescription>Asset performance comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceTable />
              </CardContent>
            </Card>
          </div>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Portfolio Insights</CardTitle>
              <CardDescription>AI-powered analysis of your holdings</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="summary">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    Your portfolio has shown strong performance over the past{" "}
                    {timeframe === "1w"
                      ? "week"
                      : timeframe === "1m"
                        ? "month"
                        : timeframe === "3m"
                          ? "3 months"
                          : timeframe === "1y"
                            ? "year"
                            : "period"}
                    , outperforming the overall market by 5.3%. Bitcoin and Ethereum make up 75% of your holdings,
                    providing a solid foundation. Consider diversifying into some mid-cap altcoins to potentially
                    increase returns while maintaining a reasonable risk profile.
                  </p>
                </TabsContent>
                <TabsContent value="risk" className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    Your portfolio currently has a moderate risk profile with a volatility score of 0.65. This is
                    slightly lower than the market average of 0.72. Your largest holdings (BTC and ETH) provide
                    stability, while your SOL and DOGE positions introduce higher volatility but also higher potential
                    returns. Consider setting stop-loss orders for your more volatile assets to protect against sudden
                    market downturns.
                  </p>
                </TabsContent>
                <TabsContent value="recommendations" className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    Based on your current holdings and market conditions, consider:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Increasing your Ethereum position ahead of the upcoming network upgrade</li>
                    <li>Taking partial profits on Dogecoin after its recent 15% surge</li>
                    <li>Adding exposure to DeFi tokens to diversify your portfolio</li>
                    <li>Setting up regular dollar-cost averaging for your core Bitcoin position</li>
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      <BottomNav activePage="portfolio" />
    </div>
  )
}
