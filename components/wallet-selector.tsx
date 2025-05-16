"use client"

import { ChevronDown, ChevronRight, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WalletSelectorProps {
  wallets: {
    id: string
    name: string
    balance: string
    change: string
    tokens?: {
      symbol: string
      name: string
      balance: string
      value: string
    }[]
  }[]
  expandedWallet: string | null
  toggleWallet: (id: string) => void
}

export function WalletSelector({ wallets, expandedWallet, toggleWallet }: WalletSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Wallet className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Wallets</span>
        </div>
        <Button variant="outline" size="sm">
          Import
        </Button>
      </div>
      <div className="space-y-2">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="border rounded-lg overflow-hidden">
            <div
              className="flex items-center justify-between p-3 cursor-pointer"
              onClick={() => toggleWallet(wallet.id)}
            >
              <div>
                <h3 className="font-medium">{wallet.name}</h3>
                <p className="text-sm text-muted-foreground">{wallet.balance}</p>
              </div>
              <div className="flex items-center">
                <span className={wallet.change.startsWith("+") ? "text-green-500" : "text-red-500"}>
                  {wallet.change}
                </span>
                <Button variant="ghost" size="icon" className="ml-2">
                  {expandedWallet === wallet.id ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            {expandedWallet === wallet.id && (
              <div className="p-3 pt-0 border-t">
                {wallet.tokens && wallet.tokens.length > 0 ? (
                  <div className="space-y-2 mt-2">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Token Balances</p>
                    {wallet.tokens.map((token, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">{token.symbol}</p>
                          <p className="text-xs text-muted-foreground">{token.balance}</p>
                        </div>
                        <p className="text-sm">{token.value}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    <p>Last updated: May 15, 2024</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
