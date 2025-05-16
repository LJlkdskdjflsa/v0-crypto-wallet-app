"use client"

import { useState } from "react"
import { SearchIcon, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BottomNav } from "@/components/bottom-nav"
import { TokenList } from "@/components/token-list"

export function SearchView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchHistory, setSearchHistory] = useState<string[]>(["Bitcoin", "Ethereum", "NFT", "DeFi"])

  const allTokens = [
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      price: "$60,123.45",
      balance: "0 BTC",
      value: "$0.00",
      change: "+4.2%",
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      price: "$3,456.78",
      balance: "0 ETH",
      value: "$0.00",
      change: "+2.8%",
    },
    { id: "sol", name: "Solana", symbol: "SOL", price: "$123.45", balance: "0 SOL", value: "$0.00", change: "-1.5%" },
    {
      id: "doge",
      name: "Dogecoin",
      symbol: "DOGE",
      price: "$0.12",
      balance: "0 DOGE",
      value: "$0.00",
      change: "+15.3%",
    },
    { id: "ada", name: "Cardano", symbol: "ADA", price: "$0.45", balance: "0 ADA", value: "$0.00", change: "-5.8%" },
    { id: "dot", name: "Polkadot", symbol: "DOT", price: "$6.78", balance: "0 DOT", value: "$0.00", change: "-4.3%" },
    {
      id: "matic",
      name: "Polygon",
      symbol: "MATIC",
      price: "$0.85",
      balance: "0 MATIC",
      value: "$0.00",
      change: "+8.5%",
    },
    {
      id: "avax",
      name: "Avalanche",
      symbol: "AVAX",
      price: "$34.56",
      balance: "0 AVAX",
      value: "$0.00",
      change: "-1.2%",
    },
  ]

  const filteredTokens = searchQuery
    ? allTokens.filter(
        (token) =>
          token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : []

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query && !searchHistory.includes(query)) {
      setSearchHistory([query, ...searchHistory.slice(0, 4)])
    }
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
  }

  const removeSearchItem = (item: string) => {
    setSearchHistory(searchHistory.filter((i) => i !== item))
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-14 items-center">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-bold">Search</h1>
          </div>
        </div>
      </header>

      <div className="container py-4">
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search coins, news, events..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(searchQuery)
              }
            }}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 container pb-16">
        {searchQuery ? (
          <div>
            <h2 className="text-lg font-semibold mb-2">Results</h2>
            {filteredTokens.length > 0 ? (
              <TokenList tokens={filteredTokens} />
            ) : (
              <p className="text-center text-muted-foreground py-8">No results found for "{searchQuery}"</p>
            )}
          </div>
        ) : (
          <div>
            {searchHistory.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold">Recent Searches</h2>
                  <Button variant="ghost" size="sm" onClick={clearSearchHistory}>
                    Clear All
                  </Button>
                </div>
                <div className="space-y-2">
                  {searchHistory.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <Button
                        variant="ghost"
                        className="text-left justify-start p-0 h-auto font-normal"
                        onClick={() => handleSearch(item)}
                      >
                        {item}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeSearchItem(item)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold mb-2">Popular Searches</h2>
              <div className="flex flex-wrap gap-2">
                {["Bitcoin", "Ethereum", "NFT", "DeFi", "Metaverse", "Web3", "Layer 2", "Stablecoin"].map(
                  (term, index) => (
                    <Button key={index} variant="outline" size="sm" onClick={() => handleSearch(term)}>
                      {term}
                    </Button>
                  ),
                )}
              </div>
            </div>
          </div>
        )}
      </ScrollArea>

      <BottomNav activePage="search" />
    </div>
  )
}
