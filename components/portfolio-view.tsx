"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, ChevronUp, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BottomNav } from "@/components/bottom-nav"
import { WalletSelector } from "@/components/wallet-selector"
import { TokenList } from "@/components/token-list"
import { AISummary } from "@/components/ai-summary"

export function PortfolioView() {
  const [expandedWallet, setExpandedWallet] = useState<string | null>(null)
  const [expandedSummary, setExpandedSummary] = useState(false)

  const wallets = [
    {
      id: "wallet-a",
      name: "Wallet A",
      balance: "$12,345.67",
      change: "+5.2%",
      tokens: [
        { symbol: "BTC", name: "Bitcoin", balance: "0.35 BTC", value: "$21,043.21" },
        { symbol: "ETH", name: "Ethereum", balance: "3.2 ETH", value: "$11,061.70" },
        { symbol: "SOL", name: "Solana", balance: "20 SOL", value: "$2,469.00" },
      ],
    },
    {
      id: "wallet-b",
      name: "Wallet B",
      balance: "$7,890.12",
      change: "-2.1%",
      tokens: [
        { symbol: "BTC", name: "Bitcoin", balance: "0.15 BTC", value: "$9,018.52" },
        { symbol: "ETH", name: "Ethereum", balance: "1.8 ETH", value: "$6,222.20" },
        { symbol: "DOGE", name: "Dogecoin", balance: "10000 DOGE", value: "$1,200.00" },
      ],
    },
  ]

  const tokens = [
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      price: "$60,123.45",
      balance: "0.5 BTC",
      value: "$30,061.73",
      change: "+4.2%",
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      price: "$3,456.78",
      balance: "5 ETH",
      value: "$17,283.90",
      change: "+2.8%",
    },
    {
      id: "sol",
      name: "Solana",
      symbol: "SOL",
      price: "$123.45",
      balance: "50 SOL",
      value: "$6,172.50",
      change: "-1.5%",
    },
    {
      id: "doge",
      name: "Dogecoin",
      symbol: "DOGE",
      price: "$0.12",
      balance: "10000 DOGE",
      value: "$1,200.00",
      change: "+15.3%",
    },
  ]

  const toggleWallet = (id: string) => {
    setExpandedWallet(expandedWallet === id ? null : id)
  }

  const toggleSummary = () => {
    setExpandedSummary(!expandedSummary)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-14 items-center">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-bold">Portfolio</h1>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="/connect">
                  <Plus className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 container pb-16">
        <div className="py-4">
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">$54,718.13</CardTitle>
              <CardDescription className="flex items-center text-green-500">
                <ChevronUp className="h-4 w-4 mr-1" />
                +3.2% (24h)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button variant="outline" size="sm" asChild>
                  <a href="/analytics">Analytics</a>
                </Button>
              </div>
              <WalletSelector wallets={wallets} expandedWallet={expandedWallet} toggleWallet={toggleWallet} />
            </CardContent>
          </Card>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Your Assets</h2>
              <Button variant="ghost" size="sm">
                See All
              </Button>
            </div>
            <TokenList tokens={tokens} />
          </div>

          <Card className="mb-4">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>AI Portfolio Analysis</CardTitle>
                <Button variant="ghost" size="icon" onClick={toggleSummary}>
                  {expandedSummary ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <AISummary
                expanded={expandedSummary}
                summary="Your portfolio is showing strong performance with Bitcoin leading the gains (+4.2%). Ethereum has stabilized after recent volatility, while Solana is experiencing a slight correction. Overall market sentiment remains bullish with increased institutional adoption."
                details={
                  expandedSummary
                    ? [
                        {
                          title: "Bitcoin ETF Inflows",
                          description:
                            "Recent Bitcoin ETF approvals have led to significant institutional inflows, supporting the current price levels.",
                        },
                        {
                          title: "Ethereum Upgrade",
                          description:
                            "The upcoming Ethereum network upgrade is expected to improve scalability and potentially increase value.",
                        },
                        {
                          title: "Market Liquidity",
                          description:
                            "Overall market liquidity has improved by 15% in the past week, reducing volatility risks.",
                        },
                      ]
                    : []
                }
              />
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      <BottomNav activePage="portfolio" />
    </div>
  )
}
