"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { BottomNav } from "@/components/bottom-nav"

// Mock event data
const events = {
  "1": {
    title: "Bitcoin ETF Approval",
    description:
      "The Securities and Exchange Commission (SEC) has approved several spot Bitcoin ETFs, marking a significant milestone for Bitcoin's institutional adoption. This development allows traditional investors to gain exposure to Bitcoin without directly holding the asset.",
    date: "January 10, 2024",
    impact: "positive",
    details:
      "The approval came after years of rejected applications and represents a shift in the SEC's stance on cryptocurrency investment vehicles. Trading volumes in the first week exceeded expectations, with over $10 billion in combined trading volume across all approved ETFs. Financial analysts predict this could lead to significant inflows into Bitcoin over the coming months as more institutional investors gain exposure through these regulated products.",
    relatedTokens: ["Bitcoin (BTC)"],
    source: "SEC Official Announcement, Financial News Networks",
  },
  "2": {
    title: "Mining Difficulty Increase",
    description:
      "Bitcoin mining difficulty increased by 5% in the latest adjustment, reflecting growing hash rate on the network.",
    date: "February 5, 2024",
    impact: "neutral",
    details:
      "The Bitcoin network automatically adjusts mining difficulty approximately every two weeks to maintain a target block time of 10 minutes. This latest increase indicates growing computational power dedicated to Bitcoin mining, potentially due to miners deploying more efficient hardware or new operations coming online. While higher difficulty can mean increased security for the network, it also means miners need more computational resources to earn the same rewards.",
    relatedTokens: ["Bitcoin (BTC)"],
    source: "Bitcoin Network Data, Mining Pool Statistics",
  },
  "3": {
    title: "Major Exchange Listing",
    description: "A major global exchange has announced Bitcoin futures trading, expanding institutional access.",
    date: "January 25, 2024",
    impact: "positive",
    details:
      "The exchange, which handles over $5 billion in daily trading volume across traditional financial instruments, will begin offering Bitcoin futures contracts starting next month. This move is expected to bring new institutional traders into the cryptocurrency market and potentially increase liquidity. The futures contracts will be physically settled, meaning actual Bitcoin will change hands upon expiration, rather than cash settlements used by some other exchanges.",
    relatedTokens: ["Bitcoin (BTC)"],
    source: "Exchange Press Release, Industry Publications",
  },
}

interface ChatMessage {
  role: "user" | "ai"
  content: string
}

export function EventDetailView({ eventId }: { eventId: string }) {
  const [inputValue, setInputValue] = useState("")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])

  // Default to first event if ID is not found
  const event = events[eventId as keyof typeof events] || events["1"]

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    setChatMessages([...chatMessages, { role: "user", content: inputValue }])

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (inputValue.toLowerCase().includes("impact") || inputValue.toLowerCase().includes("price")) {
        response = `Based on historical data, events like "${event.title}" typically have a ${event.impact === "positive" ? "positive" : event.impact === "negative" ? "negative" : "neutral"} impact on ${event.relatedTokens.join(", ")} prices. In this case, we've seen approximately a ${event.impact === "positive" ? "4-7% increase" : event.impact === "negative" ? "2-5% decrease" : "1-2% fluctuation"} following the announcement.`
      } else if (inputValue.toLowerCase().includes("explain") || inputValue.toLowerCase().includes("what")) {
        response = `${event.details} This event is considered ${event.impact} for ${event.relatedTokens.join(", ")}.`
      } else if (inputValue.toLowerCase().includes("source") || inputValue.toLowerCase().includes("where")) {
        response = `This information comes from ${event.source}.`
      } else {
        response = `This ${event.impact} event for ${event.relatedTokens.join(", ")} occurred on ${event.date}. ${event.description} Would you like to know more about its market impact or technical details?`
      }

      setChatMessages((prev) => [...prev, { role: "ai", content: response }])
    }, 1000)

    setInputValue("")
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
            <h1 className="text-xl font-bold ml-2">Event Details</h1>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 container pb-16">
        <div className="py-4">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{event.description}</p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Impact</h3>
                  <p
                    className={`text-sm ${
                      event.impact === "positive"
                        ? "text-green-500"
                        : event.impact === "negative"
                          ? "text-red-500"
                          : "text-gray-500"
                    }`}
                  >
                    {event.impact.charAt(0).toUpperCase() + event.impact.slice(1)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Related Tokens</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.relatedTokens.map((token, index) => (
                      <div key={index} className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs">
                        {token}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Details</h3>
                  <p className="text-sm text-muted-foreground">{event.details}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Source</h3>
                  <p className="text-sm text-muted-foreground">{event.source}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ask AI About This Event</CardTitle>
              <CardDescription>Get insights and analysis about this event</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4">
                {chatMessages.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Ask a question about this event to get AI insights
                  </p>
                ) : (
                  chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Ask about this event..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage()
                    }
                  }}
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      <BottomNav activePage="portfolio" />
    </div>
  )
}
