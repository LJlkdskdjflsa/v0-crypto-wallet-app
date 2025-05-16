"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronDown, ChevronRight, ChevronUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BottomNav } from "@/components/bottom-nav"
import { PriceChart } from "@/components/price-chart"
import { AISummary } from "@/components/ai-summary"
import { EventList } from "@/components/event-list"

const tokenData = {
  btc: {
    name: "Bitcoin",
    symbol: "BTC",
    price: "$60,123.45",
    change: "+4.2%",
    isPositive: true,
    technicalSummary:
      "Bitcoin is currently trading above both the 50-day and 200-day moving averages, indicating a strong bullish trend. Key support levels are at $58,000 and $55,500, with resistance at $62,000 and $65,000. The RSI is at 62, suggesting room for further upside before becoming overbought.",
    newsSummary:
      "Recent approval of spot Bitcoin ETFs has led to significant institutional inflows. Additionally, major corporations continue to add Bitcoin to their balance sheets as an inflation hedge. The overall sentiment remains bullish despite regulatory concerns in some regions.",
    events: [
      {
        id: "1",
        title: "Bitcoin ETF Approval",
        description: "SEC approves spot Bitcoin ETFs, leading to institutional adoption",
        date: "2 days ago",
        impact: "positive",
      },
      {
        id: "2",
        title: "Mining Difficulty Increase",
        description: "Bitcoin mining difficulty increased by 5% in the latest adjustment",
        date: "1 week ago",
        impact: "neutral",
      },
      {
        id: "3",
        title: "Major Exchange Listing",
        description: "New major exchange announces Bitcoin futures trading",
        date: "3 weeks ago",
        impact: "positive",
      },
    ],
  },
  eth: {
    name: "Ethereum",
    symbol: "ETH",
    price: "$3,456.78",
    change: "+2.8%",
    isPositive: true,
    technicalSummary:
      "Ethereum is consolidating above the $3,400 support level with decreasing volatility. The 50-day moving average is crossing above the 200-day MA, forming a golden cross pattern which is typically bullish. Key resistance levels are at $3,600 and $3,800.",
    newsSummary:
      "Ethereum's upcoming network upgrade is expected to improve scalability and reduce gas fees. DeFi and NFT activity on the network remains strong, contributing to increased demand for ETH. Several layer-2 solutions are gaining traction, potentially benefiting the Ethereum ecosystem.",
    events: [
      {
        id: "1",
        title: "Network Upgrade Announcement",
        description: "Ethereum Foundation announces date for next major upgrade",
        date: "3 days ago",
        impact: "positive",
      },
      {
        id: "2",
        title: "DeFi Protocol Launch",
        description: "Major new DeFi protocol launches on Ethereum mainnet",
        date: "1 week ago",
        impact: "positive",
      },
      {
        id: "3",
        title: "Gas Fee Spike",
        description: "Gas fees temporarily spiked due to NFT launch congestion",
        date: "2 weeks ago",
        impact: "negative",
      },
    ],
  },
  sol: {
    name: "Solana",
    symbol: "SOL",
    price: "$123.45",
    change: "-1.5%",
    isPositive: false,
    technicalSummary:
      "Solana is experiencing a minor correction after a strong rally. It's currently testing the $120 support level with the 14-day RSI at 45, indicating neutral momentum. The 50-day moving average at $115 should provide strong support if the correction continues.",
    newsSummary:
      "Solana's ecosystem continues to grow with new DeFi and NFT projects. Recent network performance improvements have addressed previous concerns about outages. Competition from other high-performance blockchains remains a challenge, but developer activity remains strong.",
    events: [
      {
        id: "1",
        title: "Network Upgrade",
        description: "Solana completes network upgrade to improve stability",
        date: "5 days ago",
        impact: "positive",
      },
      {
        id: "2",
        title: "New Validator Onboarding",
        description: "10 new validators join the Solana network, improving decentralization",
        date: "1 week ago",
        impact: "positive",
      },
      {
        id: "3",
        title: "DEX Volume Record",
        description: "Solana-based DEXs reach new volume record of $2B daily",
        date: "2 weeks ago",
        impact: "positive",
      },
    ],
  },
  doge: {
    name: "Dogecoin",
    symbol: "DOGE",
    price: "$0.12",
    change: "+15.3%",
    isPositive: true,
    technicalSummary:
      "Dogecoin has broken out of its recent trading range with high volume, suggesting strong momentum. The price has moved above both the 50-day and 200-day moving averages. Key resistance levels are at $0.15 and $0.18, with support at $0.10.",
    newsSummary:
      "Social media activity around Dogecoin has surged following celebrity endorsements. The community remains active in charitable initiatives. While primarily driven by sentiment rather than fundamentals, recent developments aim to increase utility beyond its meme coin status.",
    events: [
      {
        id: "1",
        title: "Celebrity Endorsement",
        description: "Major celebrity tweets about Dogecoin, causing price surge",
        date: "1 day ago",
        impact: "positive",
      },
      {
        id: "2",
        title: "Payment Integration",
        description: "Online retailer announces Dogecoin payment integration",
        date: "1 week ago",
        impact: "positive",
      },
      {
        id: "3",
        title: "Development Update",
        description: "Dogecoin core developers release roadmap for technical improvements",
        date: "3 weeks ago",
        impact: "neutral",
      },
    ],
  },
}

export function TokenView({ tokenId }: { tokenId: string }) {
  const [timeframe, setTimeframe] = useState("1d")
  const [expandedTechnical, setExpandedTechnical] = useState(false)
  const [expandedNews, setExpandedNews] = useState(false)

  // Default to Bitcoin if token ID is not found
  const token = tokenData[tokenId as keyof typeof tokenData] || tokenData.btc

  const toggleTechnical = () => {
    setExpandedTechnical(!expandedTechnical)
  }

  const toggleNews = () => {
    setExpandedNews(!expandedNews)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-14 items-center">
          <div className="flex flex-1 items-center">
            <Link href="/portfolio">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="ml-2">
              <h1 className="text-xl font-bold">{token.name}</h1>
              <p className="text-sm text-muted-foreground">{token.symbol}</p>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 container pb-16">
        <div className="py-4">
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">{token.price}</CardTitle>
              <CardDescription className={`flex items-center ${token.isPositive ? "text-green-500" : "text-red-500"}`}>
                {token.isPositive ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
                {token.change} (24h)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <PriceChart timeframe={timeframe} tokenSymbol={token.symbol} isPositive={token.isPositive} />
              </div>
              <Tabs defaultValue="1d" onValueChange={setTimeframe} className="w-full">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="1d">1D</TabsTrigger>
                  <TabsTrigger value="1w">1W</TabsTrigger>
                  <TabsTrigger value="1m">1M</TabsTrigger>
                  <TabsTrigger value="1y">1Y</TabsTrigger>
                  <TabsTrigger value="max">Max</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Technical Analysis</CardTitle>
                <Button variant="ghost" size="icon" onClick={toggleTechnical}>
                  {expandedTechnical ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <AISummary expanded={expandedTechnical} summary={token.technicalSummary} details={[]} />
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>News & Events</CardTitle>
                <Button variant="ghost" size="icon" onClick={toggleNews}>
                  {expandedNews ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <AISummary
                expanded={expandedNews}
                summary={token.newsSummary}
                details={
                  expandedNews
                    ? token.events.map((event) => ({
                        title: event.title,
                        description: event.description,
                      }))
                    : []
                }
              />
              {expandedNews && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Recent Events</h3>
                  <EventList events={token.events} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      <BottomNav activePage="portfolio" />
    </div>
  )
}
