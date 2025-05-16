"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function NewsView() {
  const [searchQuery, setSearchQuery] = useState("")

  const newsArticles = [
    {
      id: "news1",
      title: "Bitcoin ETFs See Record Inflows as Institutional Adoption Grows",
      summary:
        "Bitcoin ETFs have recorded over $500 million in inflows this week, signaling growing institutional interest in the cryptocurrency market.",
      source: "Crypto News Daily",
      date: "May 15, 2024",
      time: "2 hours ago",
      category: "market",
      relatedTokens: ["BTC"],
      imageUrl: "/bitcoin-etf-chart.png",
    },
    {
      id: "news2",
      title: "Ethereum Completes Major Network Upgrade, Improving Scalability",
      summary:
        "Ethereum has successfully implemented its latest network upgrade, which aims to significantly improve transaction throughput and reduce gas fees.",
      source: "Blockchain Insider",
      date: "May 14, 2024",
      time: "1 day ago",
      category: "technology",
      relatedTokens: ["ETH"],
      imageUrl: "/ethereum-network-upgrade.png",
    },
    {
      id: "news3",
      title: "Regulatory Clarity: New Framework for Crypto Assets Proposed",
      summary:
        "A new regulatory framework for cryptocurrency assets has been proposed, potentially providing much-needed clarity for businesses and investors in the space.",
      source: "Financial Times",
      date: "May 13, 2024",
      time: "2 days ago",
      category: "regulation",
      relatedTokens: ["BTC", "ETH", "SOL"],
      imageUrl: "/crypto-regulation.png",
    },
    {
      id: "news4",
      title: "Solana DeFi Ecosystem Reaches New Milestone with $10B TVL",
      summary:
        "The Solana DeFi ecosystem has reached a new milestone with over $10 billion in total value locked across various protocols.",
      source: "DeFi Pulse",
      date: "May 12, 2024",
      time: "3 days ago",
      category: "defi",
      relatedTokens: ["SOL"],
      imageUrl: "/placeholder-avyp1.png",
    },
    {
      id: "news5",
      title: "Major Retailer Announces Bitcoin Payment Integration",
      summary:
        "A major global retailer has announced plans to accept Bitcoin as payment across its online platforms, potentially reaching millions of customers.",
      source: "Business Insider",
      date: "May 11, 2024",
      time: "4 days ago",
      category: "adoption",
      relatedTokens: ["BTC"],
      imageUrl: "/placeholder-lofcp.png",
    },
  ]

  const filteredNews = searchQuery
    ? newsArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.relatedTokens.some((token) => token.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : newsArticles

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "market":
        return "bg-blue-500"
      case "technology":
        return "bg-purple-500"
      case "regulation":
        return "bg-yellow-500"
      case "defi":
        return "bg-green-500"
      case "adoption":
        return "bg-pink-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-14 items-center">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-bold">News</h1>
          </div>
        </div>
      </header>

      <div className="container py-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search news..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" className="mb-4">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="technology">Tech</TabsTrigger>
            <TabsTrigger value="regulation">Regulation</TabsTrigger>
            <TabsTrigger value="defi">DeFi</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="flex-1 container pb-16">
        <div className="space-y-4">
          {filteredNews.length > 0 ? (
            filteredNews.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <img
                    src={article.imageUrl || "/placeholder.svg"}
                    alt={article.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={`${getCategoryColor(article.category)} text-white`}>
                      {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription className="flex justify-between">
                    <span>{article.source}</span>
                    <span>{article.time}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{article.summary}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-1">
                    {article.relatedTokens.map((token, index) => (
                      <Badge key={index} variant="outline">
                        {token}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`/news/${article.id}`}>Read More</a>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No news articles found</p>
            </div>
          )}
        </div>
      </ScrollArea>

      <BottomNav activePage="portfolio" />
    </div>
  )
}
