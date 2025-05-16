interface AISummaryProps {
  expanded: boolean
  summary: string
  details: {
    title: string
    description: string
  }[]
}

export function AISummary({ expanded, summary, details }: AISummaryProps) {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-2">{summary}</p>

      {expanded && details.length > 0 && (
        <div className="mt-4 space-y-3">
          {details.map((detail, index) => (
            <div key={index} className="border-l-2 border-primary pl-3">
              <h4 className="text-sm font-medium">{detail.title}</h4>
              <p className="text-xs text-muted-foreground">{detail.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
