/** ID klienti — backend Klientet përdor fushën `id` (kolona klient_id). */
export const getKlientId = (klient) =>
  klient?.id ?? klient?.klientId ?? null

export const klientRef = (id) => (id != null && id !== '' ? { id: Number(id) } : null)

export const punonjesRef = (id) =>
  id != null && id !== '' ? { punonjesId: Number(id) } : null

export const porosiRef = (id) =>
  id != null && id !== '' ? { porosiId: Number(id) } : null

export const produktRef = (id) =>
  id != null && id !== '' ? { produktId: Number(id) } : null

export const lenteRef = (id) =>
  id != null && id !== '' ? { lenteId: Number(id) } : null

export const recetaRef = (id) =>
  id != null && id !== '' ? { receteId: Number(id) } : null

export const kategoriRef = (id) =>
  id != null && id !== '' ? { kategoriId: Number(id) } : null

export const kontrollRef = (id) =>
  id != null && id !== '' ? { kontrollId: Number(id) } : null

export const klientLabel = (klient) => {
  if (!klient) return '—'
  const emri = klient.emri ?? ''
  const mbiemri = klient.mbiemri ?? ''
  const name = `${emri} ${mbiemri}`.trim()
  const kid = getKlientId(klient)
  return name || (kid != null ? `#${kid}` : '—')
}
