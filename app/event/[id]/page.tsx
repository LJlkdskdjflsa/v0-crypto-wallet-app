import { EventDetailView } from "@/components/event-detail-view"

export default function EventPage({ params }: { params: { id: string } }) {
  return <EventDetailView eventId={params.id} />
}
