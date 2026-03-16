const GO_ZERO_DATE = '0001-01-01T00:00:00Z'

export function formatDate(isoString: string): string {
  if (!isoString || isoString === GO_ZERO_DATE) return '—'

  return new Date(isoString).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
