'use client'

import { useState } from 'react'

const MODALITIES = ['Presencial', 'Video'] as const
type Modality = (typeof MODALITIES)[number]

export function TimelineFilters({ dateLabel }: { dateLabel: string }) {
  const [active, setActive] = useState<Modality | null>(null)

  return (
    <div className="timeline-filters">
      <span className="timeline-date-chip">{dateLabel}</span>
      <div className="timeline-modality-toggle" role="group" aria-label="Filtrar por modalidad">
        {MODALITIES.map((modality) => (
          <button
            key={modality}
            type="button"
            className={`timeline-modality-chip ${active === modality ? 'active' : ''}`}
            aria-pressed={active === modality}
            onClick={() => setActive((current) => (current === modality ? null : modality))}
          >
            {modality}
          </button>
        ))}
      </div>
    </div>
  )
}
