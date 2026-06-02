import { createAdminClient } from '@/lib/supabase-server'
import AdminDashboard from './AdminDashboard'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Admin — The Digital Forum' }

async function getStats() {
  const supabase = createAdminClient()

  // Récupérer toutes les inscriptions en une seule requête simple (sans FK join)
  const { data: inscriptions, error: eInscriptions } = await supabase
    .from('inscriptions')
    .select('id, prenom, nom, email, telephone, ville, statut_pro, secteur, source, attentes, question_qa, statut, created_at, edition_id')
    .order('created_at', { ascending: false })

  if (eInscriptions) console.error('[admin] inscriptions:', eInscriptions.message)

  // Récupérer les éditions séparément
  const { data: editions, error: eEditions } = await supabase
    .from('editions')
    .select('id, titre, statut, date_event, capacite')
    .order('numero')

  if (eEditions) console.error('[admin] editions:', eEditions.message)

  // Calculs en JavaScript (fiable, pas de dépendance aux count Supabase)
  const allInscriptions = inscriptions ?? []
  const allEditions = editions ?? []

  const totalInscrits = allInscriptions.length
  const totalConfirmes = allInscriptions.filter(i => i.statut === 'confirmee').length

  // Enrichir avec le titre de l'édition
  const editionMap = Object.fromEntries(allEditions.map(e => [e.id, e.titre]))
  const derniers = allInscriptions.slice(0, 100).map(i => ({
    ...i,
    editions: editionMap[i.edition_id] ? { titre: editionMap[i.edition_id] } : null,
  }))

  // Compter par édition
  const countByEdition: Record<string, number> = {}
  allInscriptions.forEach(i => {
    countByEdition[i.edition_id] = (countByEdition[i.edition_id] || 0) + 1
  })

  const errors = [eInscriptions, eEditions].filter(Boolean).map(e => e!.message)

  return {
    totalInscrits,
    totalConfirmes,
    derniers,
    editions: allEditions,
    countByEdition,
    errors,
  }
}

export default async function AdminPage() {
  const stats = await getStats()
  return <AdminDashboard stats={stats} />
}
