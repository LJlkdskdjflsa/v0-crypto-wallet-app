import Link from "next/link"
import { ArrowDown, ArrowRight, ArrowUp, Minus } from "lucide-react"

interface EventListProps {
  events: {
    id: string
    title: string
    description: string
    date: string
    impact: string
  }[]
}

export function EventList({ events }: EventListProps) {
  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return <ArrowUp className="h-4 w-4 text-green-500" />
      case "negative":
        return <ArrowDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-2">
      {events.map((event) => (
        <Link key={event.id} href={`/event/${event.id}`}>
          <div className="flex items-start p-3 border rounded-lg hover:bg-accent/50 transition-colors">
            <div className="mr-3 mt-1">{getImpactIcon(event.impact)}</div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">{event.title}</h3>
              <p className="text-xs text-muted-foreground">{event.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground mt-1" />
          </div>
        </Link>
      ))}
    </div>
  )
}
