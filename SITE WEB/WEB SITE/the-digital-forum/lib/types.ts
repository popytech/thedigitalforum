export type EditionStatut = 'draft' | 'published' | 'terminee'
export type SpeakerRole = 'speaker' | 'host' | 'moderateur' | 'invite_special'
export type SponsorPack = 'bronze' | 'argent' | 'or' | 'officiel'
export type StatutPro = 'Étudiant' | 'Entrepreneur' | 'Freelance' | 'Salarié' | 'Créateur' | 'Autre'

export interface Edition {
  id: string
  slug: string
  numero: number
  titre: string
  theme: string
  sous_theme?: string
  date_evenement: string
  lieu?: string
  capacite: number
  statut: EditionStatut
  gratuit: boolean
  prix_standard?: number
  prix_vip?: number
  created_at: string
  speakers?: EditionSpeaker[]
}

export interface Speaker {
  id: string
  prenom: string
  nom: string
  titre?: string
  organisation?: string
  bio?: string
  photo_url?: string
  linkedin?: string
  facebook?: string
  role: SpeakerRole
  created_at: string
}

export interface EditionSpeaker {
  edition_id: string
  speaker_id: string
  role_edition?: string
  sujet?: string
  speaker?: Speaker
}

export interface Inscription {
  id: string
  edition_id: string
  prenom: string
  nom: string
  telephone: string
  email?: string
  ville?: string
  statut_pro?: StatutPro
  secteur?: string
  source?: string
  attentes?: string
  question_qa?: string
  qr_code: string
  present: boolean
  created_at: string
}

export interface Sponsor {
  id: string
  nom: string
  logo_url?: string
  site_web?: string
  pack: SponsorPack
  created_at: string
}

export interface Attestation {
  id: string
  inscription_id: string
  code_unique: string
  pdf_url?: string
  emise_le: string
  inscription?: Inscription
}

export interface Membre {
  id: string
  prenom?: string
  nom?: string
  photo_url?: string
  bio?: string
  secteur?: string
  linkedin?: string
  facebook?: string
  whatsapp?: string
  created_at: string
}

export interface GalleryPhoto {
  id: string
  edition_id: string
  url: string
  caption?: string
  taken_at?: string
  created_at: string
}

export interface SponsorPackInfo {
  id: SponsorPack
  nom: string
  prix: string
  couleur: string
  avantages: string[]
  places_vip: number
  featured?: boolean
}

export interface InscriptionFormData {
  prenom: string
  nom: string
  telephone: string
  email: string
  ville: string
  statut_pro: StatutPro
  secteur: string
  source: string
  attentes: string
  question_qa?: string
}

export interface ContactFormData {
  nom: string
  email: string
  telephone: string
  objet: 'Inscription' | 'Sponsoring' | 'Partenariat' | 'Autre'
  message: string
}

export interface SponsorFormData {
  nom: string
  entreprise: string
  pack: SponsorPack
  telephone: string
  message: string
}

export interface Testimonial {
  id: string
  nom: string
  statut: string
  citation: string
  avatar?: string
}

export interface NavLink {
  href: string
  label: string
}

export interface CountdownTime {
  jours: number
  heures: number
  minutes: number
  secondes: number
}
