import type { Edition, Speaker, SponsorPackInfo, Testimonial, NavLink } from './types'

export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://thedigitalforum.gn'
export const CONTACT_PHONE = '+224 612 960 453'
export const WHATSAPP_LINK = 'https://chat.whatsapp.com/DalsqPZFqKDJVDLn6Avmbt'
export const WHATSAPP_COMMUNITY = 'https://chat.whatsapp.com/DalsqPZFqKDJVDLn6Avmbt'
export const ORGANISATEUR_EMAIL = 'contact@popytech.com'

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Accueil' },
  { href: '/editions', label: 'Éditions' },
  { href: '/speakers', label: 'Speakers' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/equipe', label: 'Équipe' },
  { href: '/a-propos', label: 'À Propos' },
  { href: '/contact', label: 'Contact' },
]

export const EDITIONS_DATA: Edition[] = [
  {
    id: '1',
    slug: 'edition-01-juin-2026',
    numero: 1,
    titre: 'Édition 01',
    theme: 'Gagner de l\'argent avec le digital',
    sous_theme: 'Comment transformer tes compétences en revenus réels et durables depuis l\'Afrique',
    date_evenement: '2026-06-14T11:00:00Z',
    lieu: 'À confirmer · Conakry, Guinée',
    capacite: 120,
    statut: 'published',
    gratuit: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    slug: 'edition-02-septembre-2026',
    numero: 2,
    titre: 'Édition 02',
    theme: 'E-commerce & vente en ligne en Afrique',
    date_evenement: '2026-09-13T11:00:00Z',
    lieu: 'Conakry, Guinée',
    capacite: 120,
    statut: 'draft',
    gratuit: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    slug: 'edition-03-decembre-2026',
    numero: 3,
    titre: 'Édition 03',
    theme: 'Personal branding & revenus',
    date_evenement: '2026-12-13T11:00:00Z',
    lieu: 'Conakry, Guinée',
    capacite: 120,
    statut: 'draft',
    gratuit: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    slug: 'edition-04-mars-2027',
    numero: 4,
    titre: 'Édition 04',
    theme: 'IA & digital en Afrique',
    date_evenement: '2027-03-13T11:00:00Z',
    lieu: 'Conakry, Guinée',
    capacite: 120,
    statut: 'draft',
    gratuit: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    slug: 'edition-05-juin-2027',
    numero: 5,
    titre: 'Édition 05',
    theme: 'Bilan 1 an & Vision Afrique',
    sous_theme: 'Édition anniversaire — 1 an de The Digital Forum',
    date_evenement: '2027-06-12T11:00:00Z',
    lieu: 'Conakry, Guinée',
    capacite: 120,
    statut: 'draft',
    gratuit: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    slug: 'edition-06-septembre-2027',
    numero: 6,
    titre: 'Édition 06',
    theme: 'Financer son projet digital',
    sous_theme: 'Levées de fonds, subventions & modèles économiques en Afrique',
    date_evenement: '2027-09-12T11:00:00Z',
    lieu: 'Conakry, Guinée',
    capacite: 120,
    statut: 'draft',
    gratuit: true,
    created_at: new Date().toISOString(),
  },
]

export const SPEAKERS_DATA: Speaker[] = [
  {
    id: '1',
    prenom: 'Popy',
    nom: 'Traoré',
    titre: 'CEO & Fondateur · Popy Tech Agency',
    organisation: 'Popy Tech Agency',
    bio: 'Entrepreneur digital, consultant et formateur. Fondateur de WatShop Africa et DigitalPro Academy. 500+ vendeurs accompagnés dans 12 pays africains.',
    photo_url: '/images/speakers/popy-traore.jpg',
    role: 'host',
    facebook: 'https://www.facebook.com/misterpopyofficiel/',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    prenom: 'Coach Fodé',
    nom: 'Le Stratège',
    titre: 'Auteur & Conférencier International',
    organisation: 'Expert en vente & croissance business',
    bio: 'Conférencier international, auteur et expert reconnu en stratégie de vente et croissance business en Afrique.',
    photo_url: '/images/speakers/coach-fode.jpeg',
    role: 'speaker',
    facebook: 'https://www.facebook.com/profile.php?id=100064344091210',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    prenom: 'Thierno',
    nom: 'MD',
    titre: 'Fondateur · Guinée Dev',
    organisation: 'Web Entrepreneur & Créateur de contenu',
    bio: 'Fondateur de Guinée Dev, web entrepreneur et créateur de contenu éducatif digital. Figure montante du digital éducatif en Guinée.',
    photo_url: '/images/speakers/thierno-md.jpg',
    role: 'speaker',
    facebook: 'https://www.facebook.com/thiernomd224',
    created_at: new Date().toISOString(),
  },
]

export const SPONSOR_PACKS: SponsorPackInfo[] = [
  {
    id: 'bronze',
    nom: 'Bronze',
    prix: '2 000 000 GNF',
    couleur: '#CD7F32',
    places_vip: 1,
    avantages: [
      'Logo sur l\'affiche officielle',
      'Logo sur tous les supports digitaux',
      'Mention orale lors de l\'introduction',
      '1 place VIP offerte',
      'Rapport post-événement chiffré',
    ],
  },
  {
    id: 'argent',
    nom: 'Argent',
    prix: '5 000 000 GNF',
    couleur: '#C0C0C0',
    places_vip: 3,
    avantages: [
      'Tout le pack Bronze inclus',
      'Stand 1m×1m le jour J',
      'Distribution de vos flyers / goodies',
      'Post Facebook dédié avant l\'événement',
      '3 places VIP offertes',
    ],
  },
  {
    id: 'or',
    nom: 'Or',
    prix: '10 000 000 GNF',
    couleur: '#FFD700',
    places_vip: 5,
    featured: true,
    avantages: [
      'Tout le pack Argent inclus',
      '5 minutes de prise de parole',
      'Visibilité digitale 30 jours post-événement',
      'Rapport enrichi avec métriques de visibilité',
      '5 places VIP offertes',
    ],
  },
  {
    id: 'officiel',
    nom: 'Partenaire Officiel',
    prix: 'Sur devis',
    couleur: '#A8FF78',
    places_vip: 0,
    avantages: [
      'Co-branding complet',
      'Présence totale pré / pendant / post-événement',
      'Prise de parole étendue + table ronde',
      'Accès à la liste participants (avec consentement)',
      'Convention formelle sur 3 éditions · Places VIP illimitées',
    ],
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    nom: 'Mamadou Bah',
    statut: 'Entrepreneur Digital',
    citation:
      'The Digital Forum m\'a permis de rencontrer des personnes clés qui ont transformé mon business. Une expérience incontournable pour tout entrepreneur guinéen.',
    avatar: '/images/avatars/avatar-1.jpg',
  },
  {
    id: '2',
    nom: 'Fatoumata Diallo',
    statut: 'Freelance Design',
    citation:
      'J\'ai appris plus en 4 heures qu\'en 6 mois de lectures. Les speakers sont concrets, les conseils sont actionnables immédiatement.',
    avatar: '/images/avatars/avatar-2.jpg',
  },
  {
    id: '3',
    nom: 'Ibrahima Camara',
    statut: 'Étudiant en Marketing',
    citation:
      'Le networking est exceptionnel. J\'ai trouvé mon premier client le jour même de l\'événement. Merci Popy Tech !',
    avatar: '/images/avatars/avatar-3.jpg',
  },
  {
    id: '4',
    nom: 'Aissatou Sow',
    statut: 'E-commerçante',
    citation:
      'L\'attestation certifiante a vraiment de la valeur. Elle m\'a ouvert des portes que je n\'espérais pas. Bravo pour cette initiative !',
    avatar: '/images/avatars/avatar-4.jpg',
  },
]

export const HASHTAGS = [
  '#TheDigitalForum',
  '#PopyTech',
  '#DigitalAfrique',
  '#Guinée',
  '#Conakry',
]
