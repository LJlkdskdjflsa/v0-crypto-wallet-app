import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TokenListProps {
  tokens: {
    id: string
    name: string
    symbol: string
    price: string
    balance: string
    value: string
    change: string
  }[]
}

export function TokenList({ tokens }: TokenListProps) {
  return (
    <div className="space-y-2">
      {tokens.map((token) => (
        <Link key={token.id} href={`/token/${token.id}`}>
          <Card className="hover:bg-accent/50 transition-colors">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    {token.symbol.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{token.name}</h3>
                    <p className="text-xs text-muted-foreground">{token.balance}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-right mr-2">
                    <p className="font-medium">{token.value}</p>
                    <p className={`text-xs ${token.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                      {token.change}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
