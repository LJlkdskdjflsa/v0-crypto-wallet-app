import { TokenView } from "@/components/token-view"

export default function TokenPage({ params }: { params: { id: string } }) {
  return <TokenView tokenId={params.id} />
}
