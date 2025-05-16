"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Bitcoin (BTC)", value: 30061.73, color: "#F7931A" },
  { name: "Ethereum (ETH)", value: 17283.9, color: "#627EEA" },
  { name: "Solana (SOL)", value: 6172.5, color: "#00FFA3" },
  { name: "Dogecoin (DOGE)", value: 1200, color: "#C2A633" },
]

export function AllocationChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [`$${value.toFixed(2)}`, "Value"]}
          contentStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            border: "none",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
