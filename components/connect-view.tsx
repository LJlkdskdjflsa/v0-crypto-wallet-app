"use client"

import { useState } from "react"
import { QrCode, Scan, Wallet } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BottomNav } from "@/components/bottom-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export function ConnectView() {
  const [walletAddress, setWalletAddress] = useState("")
  const [connecting, setConnecting] = useState(false)

  const walletOptions = [
    {
      id: "metamask",
      name: "MetaMask",
      description: "Connect to your MetaMask wallet",
      icon: "/metamask-logo.png",
    },
    {
      id: "walletconnect",
      name: "WalletConnect",
      description: "Scan with WalletConnect to connect",
      icon: "/walletconnect-logo.png",
    },
    {
      id: "coinbase",
      name: "Coinbase Wallet",
      description: "Connect to your Coinbase Wallet",
      icon: "/coinbase-wallet-logo.png",
    },
    {
      id: "trustwallet",
      name: "Trust Wallet",
      description: "Connect to your Trust Wallet",
      icon: "/trust-wallet-logo.png",
    },
  ]

  const handleConnect = (walletId: string) => {
    setConnecting(true)
    // Simulate connection process
    setTimeout(() => {
      setConnecting(false)
      // Redirect to portfolio or show success message
      window.location.href = "/portfolio"
    }, 2000)
  }

  const handleAddressConnect = () => {
    if (walletAddress.trim()) {
      setConnecting(true)
      // Simulate connection process
      setTimeout(() => {
        setConnecting(false)
        // Redirect to portfolio or show success message
        window.location.href = "/portfolio"
      }, 2000)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-14 items-center">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-bold">Connect Wallet</h1>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 container pb-16">
        <div className="py-4">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Connect Your Crypto Wallet</CardTitle>
              <CardDescription>
                Connect your wallet to track your portfolio, set alerts, and analyze your performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="wallets">
                <TabsList className="grid grid-cols-3 w-full mb-4">
                  <TabsTrigger value="wallets">
                    <Wallet className="h-4 w-4 mr-2" />
                    Wallets
                  </TabsTrigger>
                  <TabsTrigger value="qrcode">
                    <QrCode className="h-4 w-4 mr-2" />
                    QR Code
                  </TabsTrigger>
                  <TabsTrigger value="address">
                    <Scan className="h-4 w-4 mr-2" />
                    Address
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="wallets">
                  <div className="space-y-4">
                    {walletOptions.map((wallet) => (
                      <Button
                        key={wallet.id}
                        variant="outline"
                        className="w-full justify-start h-auto py-3"
                        onClick={() => handleConnect(wallet.id)}
                        disabled={connecting}
                      >
                        <div className="flex items-center">
                          <img src={wallet.icon || "/placeholder.svg"} alt={wallet.name} className="w-10 h-10 mr-3" />
                          <div className="text-left">
                            <p className="font-medium">{wallet.name}</p>
                            <p className="text-xs text-muted-foreground">{wallet.description}</p>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="qrcode">
                  <div className="flex flex-col items-center justify-center py-4">
                    <div className="bg-white p-4 rounded-lg mb-4">
                      <img src="/qr-code.png" alt="QR Code" className="w-[200px] h-[200px]" />
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Scan this QR code with your wallet app to connect
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="address">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="walletAddress" className="text-sm font-medium">
                        Wallet Address
                      </label>
                      <Input
                        id="walletAddress"
                        placeholder="Enter your wallet address"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                      />
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleAddressConnect}
                      disabled={!walletAddress.trim() || connecting}
                    >
                      {connecting ? "Connecting..." : "Connect Wallet"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      This will add the wallet as a read-only address for tracking purposes
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Why Connect Your Wallet?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">Automatic Portfolio Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your crypto assets automatically without manual input
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">Real-time Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Get real-time updates on your portfolio value and asset performance
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">Transaction History</h3>
                  <p className="text-sm text-muted-foreground">
                    View your complete transaction history across all connected wallets
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">Advanced Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Access detailed analytics and AI-powered insights about your holdings
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Don't have a wallet yet? Get started with one of our recommended options
            </p>
            <Button variant="outline" asChild>
              <a href="/learn/wallets" className="inline-flex items-center">
                Learn About Wallets
              </a>
            </Button>
          </div>
        </div>
      </ScrollArea>

      <BottomNav activePage="portfolio" />
    </div>
  )
}
