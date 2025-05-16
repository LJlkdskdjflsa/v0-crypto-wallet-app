"use client"

import Link from "next/link"
import { Home, Newspaper } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  activePage: string
}

export function BottomNav({ activePage }: BottomNavProps) {
  const navItems = [
    { name: "portfolio", icon: Home, href: "/portfolio", label: "Portfolio" },
    { name: "news", icon: Newspaper, href: "/news", label: "Spotlight" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-background border-t">
      <div className="grid grid-cols-2 h-16">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center",
              activePage === item.name ? "text-primary" : "text-muted-foreground",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
