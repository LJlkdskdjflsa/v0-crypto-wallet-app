import { ArrowDown, ArrowUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function PerformanceTable() {
  const assets = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "$60,123.45",
      change24h: "+4.2%",
      change7d: "+8.5%",
      change30d: "+15.3%",
      isPositive24h: true,
      isPositive7d: true,
      isPositive30d: true,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: "$3,456.78",
      change24h: "+2.8%",
      change7d: "+5.1%",
      change30d: "+12.7%",
      isPositive24h: true,
      isPositive7d: true,
      isPositive30d: true,
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: "$123.45",
      change24h: "-1.5%",
      change7d: "+3.2%",
      change30d: "+22.8%",
      isPositive24h: false,
      isPositive7d: true,
      isPositive30d: true,
    },
    {
      name: "Dogecoin",
      symbol: "DOGE",
      price: "$0.12",
      change24h: "+15.3%",
      change7d: "+18.7%",
      change30d: "-5.2%",
      isPositive24h: true,
      isPositive7d: true,
      isPositive30d: false,
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset</TableHead>
          <TableHead className="text-right">24h</TableHead>
          <TableHead className="text-right">7d</TableHead>
          <TableHead className="text-right">30d</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assets.map((asset) => (
          <TableRow key={asset.symbol}>
            <TableCell className="font-medium">
              {asset.name} ({asset.symbol})
            </TableCell>
            <TableCell className={`text-right ${asset.isPositive24h ? "text-green-500" : "text-red-500"}`}>
              <div className="flex items-center justify-end">
                {asset.isPositive24h ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                {asset.change24h}
              </div>
            </TableCell>
            <TableCell className={`text-right ${asset.isPositive7d ? "text-green-500" : "text-red-500"}`}>
              <div className="flex items-center justify-end">
                {asset.isPositive7d ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                {asset.change7d}
              </div>
            </TableCell>
            <TableCell className={`text-right ${asset.isPositive30d ? "text-green-500" : "text-red-500"}`}>
              <div className="flex items-center justify-end">
                {asset.isPositive30d ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                {asset.change30d}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
