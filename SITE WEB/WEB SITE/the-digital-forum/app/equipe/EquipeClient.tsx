'use client'

import { useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, X, Mail, Phone, ExternalLink, UserPlus } from 'lucide-react'
import LogoIcon from '@/components/ui/LogoIcon'
import { WHATSAPP_LINK } from '@/lib/constants'

interface Membre {
  id: string
  role: string
  emoji: string
  couleur: string
  description: string
  missions: string[]
  competences: string[]
  statut: 'ouvert' | 'pourvu' | 'recherche'
  personne?: {
    prenom: string
    nom: string
    photo?: string
    linkedin?: string
  }
}

const equipe: Membre[] = [
  {
    id: 'designer',
    role: 'Designer / Créatif',
    emoji: '🎨',
    couleur: '#A8FF78',
    description:
      'Conçoit l\'identité graphique de chaque édition : affiches, supports digitaux, templates réseaux sociaux et visuels de marque.',
    missions: [
      'Création des affiches et visuels officiels par édition',
      'Design des supports digitaux (posts Facebook, WhatsApp, stories)',
      'Templates présentation speakers et programme',
      'Motion design et animations pour les réseaux',
      'Respect et évolution de la charte graphique',
    ],
    competences: [
      'Figma / Adobe Illustrator / Photoshop',
      'Maîtrise de la typographie et couleurs',
      'Sens esthétique fort et œil créatif',
      'Rapidité d\'exécution sous deadline',
    ],
    statut: 'pourvu',
    personne: {
      prenom: 'Sekou',
      nom: 'Cissé',
      photo: '/images/equipe/sekou-cisse.jpeg',
    },
  },
  {
    id: 'graphiste',
    role: 'Graphiste',
    emoji: '✏️',
    couleur: '#78C8FF',
    description:
      'Assure la création des supports graphiques print et digitaux : flyers, bannières, présentations et attestations officielles.',
    missions: [
      'Création des flyers et supports print par édition',
      'Mise en page des programmes et livrets participants',
      'Bannières digitales et visuels réseaux sociaux',
      'Design des attestations et documents officiels',
      'Respect de la charte graphique The Digital Forum',
    ],
    competences: [
      'Canva Pro / Adobe Illustrator / InDesign',
      'Maîtrise de la mise en page et typographie',
      'Sens des couleurs et de la composition',
      'Livraison rapide sous contrainte de temps',
    ],
    statut: 'pourvu',
    personne: {
      prenom: 'Cece',
      nom: 'Roger',
      photo: '/images/equipe/cece-roger.png',
    },
  },
  {
    id: 'photographe',
    role: 'Photographe / Vidéaste',
    emoji: '📸',
    couleur: '#2ECC71',
    description:
      'Capte l\'énergie et les moments forts de chaque édition : couverture vidéo, aftermovie, interviews speakers et participants.',
    missions: [
      'Couverture photo complète le jour J',
      'Captation vidéo des conférences et moments clés',
      'Montage du teaser et aftermovie de l\'édition',
      'Interviews courtes des speakers et participants',
      'Livraison des fichiers haute résolution sous 48h',
    ],
    competences: [
      'Maîtrise des appareils reflex / hybrides',
      'Logiciels de montage vidéo (Premiere, DaVinci)',
      'Retouche photo (Lightroom, Photoshop)',
      'Sens du cadrage et storytelling visuel',
    ],
    statut: 'pourvu',
    personne: {
      prenom: 'Abdoulaye',
      nom: 'Camara',
      photo: '/images/equipe/abdoulaye-camara.jpeg',
    },
  },
  {
    id: 'photographe2',
    role: 'Photographe',
    emoji: '📷',
    couleur: '#27AE60',
    description:
      'Assure la couverture photo professionnelle : portraits speakers, ambiance networking et reportage complet de chaque édition.',
    missions: [
      'Couverture photo complète avant et pendant l\'événement',
      'Portraits professionnels des speakers et intervenants',
      'Reportage ambiance : networking, public, scène',
      'Sélection et retouche des meilleures photos',
      'Livraison des fichiers haute résolution sous 48h',
    ],
    competences: [
      'Maîtrise des appareils reflex / hybrides',
      'Retouche photo (Lightroom, Photoshop)',
      'Sens du cadrage et composition',
      'Réactivité et discrétion sur le terrain',
    ],
    statut: 'pourvu',
    personne: {
      prenom: 'Moussa',
      nom: 'Kéïta',
      photo: '/images/equipe/moussa-keita.jpeg',
    },
  },
  {
    id: 'community',
    role: 'Community Manager',
    emoji: '📱',
    couleur: '#FFD700',
    description:
      'Gère la présence digitale sur Facebook, WhatsApp et LinkedIn. Anime la communauté et coordonne la communication avant, pendant et après chaque édition.',
    missions: [
      'Animation des pages Facebook et groupes WhatsApp',
      'Publication du contenu selon le calendrier éditorial',
      'Engagement avec la communauté (réponses, interactions)',
      'Création de contenu quotidien sur les réseaux',
      'Rapport mensuel de performance (reach, engagement)',
    ],
    competences: [
      'Maîtrise de Facebook, WhatsApp Business, LinkedIn',
      'Copywriting percutant en français',
      'Outils de scheduling (Buffer, Meta Suite)',
      'Analyse des statistiques et métriques',
    ],
    statut: 'pourvu',
    personne: {
      prenom: 'Alhasanne',
      nom: 'Touré',
      photo: '/images/equipe/alhasanne-toure.jpg',
    },
  },
  {
    id: 'commercial',
    role: 'Commercial / Partenariats',
    emoji: '🤝',
    couleur: '#FF9F43',
    description:
      'Développe les partenariats et le sponsoring : prospection, présentation des offres et suivi des engagements contractuels avec les partenaires.',
    missions: [
      'Prospection et démarchage des sponsors potentiels',
      'Présentation des packs de partenariat',
      'Négociation et signature des contrats',
      'Suivi des livrables et satisfaction des partenaires',
      'Rapport post-édition pour chaque sponsor',
    ],
    competences: [
      'Aisance relationnelle et force de conviction',
      'Capacité de négociation commerciale',
      'Suivi administratif et contractuel',
      'Réseau professionnel à Conakry',
    ],
    statut: 'pourvu',
    personne: {
      prenom: 'Souleymane',
      nom: 'Condé',
      photo: '/images/equipe/souleymane-conde.jpeg',
    },
  },
  {
    id: 'moderatrice',
    role: 'Modératrice / Présentatrice',
    emoji: '🎤',
    couleur: '#E879F9',
    description:
      'Anime et modère les sessions de chaque édition : introduction des speakers, gestion du temps, interaction avec le public et fluidité du programme.',
    missions: [
      'Animation et présentation des sessions de l\'événement',
      'Introduction et mise en valeur des speakers',
      'Gestion du timing et du déroulement du programme',
      'Interaction et engagement avec le public',
      'Coordination avec l\'équipe technique et logistique',
    ],
    competences: [
      'Aisance orale et présence scénique',
      'Maîtrise du français et des langues locales',
      'Gestion du stress et adaptabilité en direct',
      'Sens de l\'animation et du contact humain',
    ],
    statut: 'pourvu',
    personne: {
      prenom: 'Lamarana',
      nom: 'Keita',
      photo: '/images/equipe/lamarana-keita.jpeg',
    },
  },
  {
    id: 'ambassadeur',
    role: 'Ambassadrice',
    emoji: '🌟',
    couleur: '#FF6B6B',
    description:
      'Représente The Digital Forum dans son réseau et sa communauté. Mobilise, partage et fait rayonner l\'événement pour maximiser les inscriptions et l\'impact.',
    missions: [
      'Partage des annonces dans ses réseaux (Facebook, WhatsApp)',
      'Mobilisation de son entourage pour s\'inscrire',
      'Création de contenu authentique sur l\'événement',
      'Présence physique et visibilité le jour J',
      'Témoignages et retours d\'expérience post-édition',
    ],
    competences: [
      'Communauté active sur les réseaux sociaux',
      'Authenticité et crédibilité dans son domaine',
      'Capacité à mobiliser et engager',
      'Passion pour l\'entrepreneuriat digital',
    ],
    statut: 'pourvu',
    personne: {
      prenom: 'Fanta',
      nom: 'Camara',
      photo: '/images/equipe/fanta-camara.jpeg',
    },
  },
  {
    id: 'creatrice',
    role: 'Créatrice de Contenu / Communicante',
    emoji: '✨',
    couleur: '#FB923C',
    description:
      'Produit et diffuse le contenu qui met en valeur The Digital Forum : storytelling, publications réseaux, reportages et communication autour de chaque édition.',
    missions: [
      'Création de contenu engageant pour les réseaux sociaux',
      'Storytelling autour de l\'événement et des speakers',
      'Rédaction des publications et messages clés',
      'Couverture en temps réel le jour J (stories, live)',
      'Valorisation de la communauté et des participants',
    ],
    competences: [
      'Créativité et sens du storytelling digital',
      'Maîtrise de Facebook, Instagram, TikTok',
      'Rédaction percutante et copywriting',
      'Réactivité et production rapide de contenu',
    ],
    statut: 'pourvu',
    personne: {
      prenom: 'Gnalen',
      nom: 'Touré',
      photo: '/images/equipe/gnalen-toure.jpeg',
    },
  },
  {
    id: 'logistique',
    role: 'Coordinateur Logistique',
    emoji: '⚙️',
    couleur: '#4ECDC4',
    description:
      'Assure le bon déroulement opérationnel de chaque édition : lieu, matériel, équipes bénévoles et coordination de toutes les parties prenantes le jour J.',
    missions: [
      'Recherche et réservation du lieu de l\'événement',
      'Organisation du matériel (sono, projection, mobilier)',
      'Coordination des équipes bénévoles le jour J',
      'Gestion de l\'accueil et contrôle des accès (QR codes)',
      'Coordination restauration et pauses',
    ],
    competences: [
      'Sens de l\'organisation et rigueur',
      'Gestion du stress et des imprévus',
      'Communication avec prestataires et fournisseurs',
      'Disponibilité les jours d\'événement',
    ],
    statut: 'recherche',
  },
]

const statutConfig = {
  ouvert: { label: 'Poste ouvert', color: 'text-lime border-lime/40 bg-lime/10' },
  recherche: { label: 'Nous recrutons', color: 'text-amber-400 border-amber-400/40 bg-amber-400/10' },
  pourvu: { label: 'Poste pourvu', color: 'text-gray-400 border-gray-600/60 bg-gray-700/40' },
}

function whatsappPostuler(role: string): string {
  const msg = `Bonjour Popy, je suis intéressé(e) par le poste de *${role}* au sein de The Digital Forum. Je souhaite postuler et en savoir plus. Merci ! 🙏`
  return `https://wa.me/224612960453?text=${encodeURIComponent(msg)}`
}

function MembreModal({ membre, onClose }: { membre: Membre; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.3 }}
        className="bg-dark-card border border-green-primary/30 rounded-2xl w-full max-w-[calc(100vw-2rem)] sm:max-w-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo banner ou accent bar */}
        {membre.personne?.photo ? (
          <div className="relative h-52 sm:h-64 rounded-t-2xl overflow-hidden">
            <Image
              src={membre.personne.photo}
              alt={`${membre.personne.prenom} ${membre.personne.nom}`}
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between">
              <div>
                <p className="font-display text-2xl sm:text-3xl text-white leading-tight">
                  {membre.personne.prenom} {membre.personne.nom}
                </p>
                <p className="font-condensed text-sm tracking-wider mt-0.5" style={{ color: membre.couleur }}>
                  {membre.role}
                </p>
              </div>
              <span
                className={`text-xs font-condensed font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border backdrop-blur-sm ${statutConfig[membre.statut].color}`}
              >
                {statutConfig[membre.statut].label}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-dark-bg/70 backdrop-blur-sm flex items-center justify-center text-gray-300 hover:text-white transition-all"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <>
            <div className="h-1.5 rounded-t-2xl" style={{ background: membre.couleur }} />
            <div className="p-5 sm:p-7 flex items-start justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                  style={{ background: `${membre.couleur}15`, border: `1.5px solid ${membre.couleur}40` }}
                >
                  {membre.emoji}
                </div>
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl text-white leading-tight">{membre.role}</h2>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-condensed font-semibold tracking-wider uppercase border mt-1.5 ${statutConfig[membre.statut].color}`}
                  >
                    {statutConfig[membre.statut].label}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className="w-8 h-8 rounded-full bg-dark-2 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-bg transition-all shrink-0"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          </>
        )}

        <div className="p-5 sm:p-7">
          {/* Description */}
          <p className="font-body text-gray-300 leading-relaxed mb-6">{membre.description}</p>

          {/* Missions */}
          <div className="mb-6">
            <h3
              className="font-condensed font-semibold text-sm tracking-[0.15em] uppercase mb-3"
              style={{ color: membre.couleur }}
            >
              Missions
            </h3>
            <ul className="flex flex-col gap-2">
              {membre.missions.map((m) => (
                <li key={m} className="flex items-start gap-2.5 font-body text-sm text-gray-300">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: membre.couleur }} />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Compétences */}
          <div className="mb-8">
            <h3
              className="font-condensed font-semibold text-sm tracking-[0.15em] uppercase mb-3"
              style={{ color: membre.couleur }}
            >
              Compétences recherchées
            </h3>
            <div className="flex flex-wrap gap-2">
              {membre.competences.map((c) => (
                <span
                  key={c}
                  className="font-body text-xs px-3 py-1.5 rounded-full bg-dark-2 border border-green-primary/20 text-gray-300"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* CTA — toujours visible */}
          <a
            href={whatsappPostuler(membre.role)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-condensed font-bold text-sm tracking-wider uppercase transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{ background: membre.couleur, color: '#0A1810' }}
          >
            <UserPlus size={16} />
            Postuler pour ce poste
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

function MembreCard({ membre, index }: { membre: Membre; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const hasPhoto = !!membre.personne?.photo

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.08 }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full text-left bg-dark-card border border-green-primary/20 rounded-2xl overflow-hidden group hover:border-green-primary/50 hover:-translate-y-1.5 hover:shadow-green-md transition-all duration-300 focus:outline-none"
        >
          {/* Accent bar (only when no photo) */}
          {!hasPhoto && <div className="h-1" style={{ background: membre.couleur }} />}

          {/* Visual zone : photo or placeholder */}
          <div className="relative aspect-[4/5] overflow-hidden bg-dark-2">
            {hasPhoto ? (
              <>
                <Image
                  src={membre.personne!.photo!}
                  alt={`${membre.personne!.prenom} ${membre.personne!.nom}`}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/10 to-transparent" />

                {/* Accent bar on top of photo */}
                <div className="absolute top-0 inset-x-0 h-1" style={{ background: membre.couleur }} />

                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`text-[10px] font-condensed font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border backdrop-blur-md ${statutConfig[membre.statut].color}`}
                  >
                    {statutConfig[membre.statut].label}
                  </span>
                </div>

                {/* Name + role overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="font-display text-xl sm:text-2xl text-white leading-tight drop-shadow-md">
                    {membre.personne!.prenom} {membre.personne!.nom}
                  </p>
                  <p className="font-condensed text-xs tracking-wider uppercase mt-0.5 drop-shadow-sm" style={{ color: membre.couleur }}>
                    {membre.role}
                  </p>
                </div>
              </>
            ) : (
              /* Open position placeholder */
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-6">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-5xl border-2 border-dashed"
                  style={{ borderColor: `${membre.couleur}50`, background: `${membre.couleur}08` }}
                >
                  {membre.emoji}
                </div>
                <div className="text-center">
                  <p className="font-display text-xl text-white mb-1">{membre.role}</p>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="font-condensed text-xs text-amber-400 tracking-wider uppercase">
                      {statutConfig[membre.statut].label}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom info */}
          <div className="p-4 sm:p-5">
            <p className="font-body text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">
              {membre.description}
            </p>

            <div
              className="flex items-center gap-1.5 text-xs font-condensed font-semibold tracking-wider uppercase transition-all duration-200 group-hover:gap-3"
              style={{ color: membre.couleur }}
            >
              {membre.statut !== 'pourvu' ? (
                <>
                  <UserPlus size={12} />
                  Postuler maintenant
                </>
              ) : (
                <>
                  Voir le profil
                  <ArrowRight size={12} />
                </>
              )}
            </div>
          </div>
        </button>
      </motion.div>

      <AnimatePresence>
        {open && <MembreModal membre={membre} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

export default function EquipeClient() {
  const heroRef = useRef<HTMLDivElement>(null)
  const postesOuverts = equipe.filter((m) => m.statut === 'recherche').length
  const membresActifs = equipe.filter((m) => m.statut === 'pourvu').length

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero */}
      <div className="relative bg-dark-2 border-b border-green-primary/20 py-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(168,255,120,0.04) 0%, transparent 60%)' }}
        />
        <div className="absolute top-8 right-12 opacity-20">
          <LogoIcon size={120} />
        </div>

        <div className="container-site section-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Les visages de l&apos;événement</p>
            <h1 className="section-title mb-4">
              L&apos;équipe <span className="gradient-text">The Digital Forum</span>
            </h1>
            <p className="font-body text-gray-400 max-w-2xl text-lg leading-relaxed mb-8">
              Derrière chaque édition, une équipe engagée et passionnée travaille pour créer une
              expérience mémorable. {postesOuverts > 0 && 'Certains postes sont encore ouverts — rejoins-nous.'}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2.5 px-4 py-2 bg-dark-card border border-green-primary/20 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-lime" />
                <span className="font-condensed text-sm text-gray-300 uppercase tracking-wider">
                  {membresActifs} membre{membresActifs > 1 ? 's' : ''} confirmé{membresActifs > 1 ? 's' : ''}
                </span>
              </div>
              {postesOuverts > 0 && (
                <div className="flex items-center gap-2.5 px-4 py-2 bg-dark-card border border-amber-400/20 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-condensed text-sm text-amber-400 uppercase tracking-wider">
                    {postesOuverts} poste{postesOuverts > 1 ? 's' : ''} ouvert{postesOuverts > 1 ? 's' : ''}
                  </span>
                </div>
              )}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2 bg-green-primary border border-green-primary text-white font-condensed text-sm font-semibold tracking-wider uppercase rounded-xl transition-all hover:bg-green-mid active:scale-95"
              >
                Rejoindre l&apos;équipe <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Grille des profils */}
      <div className="py-20">
        <div className="container-site section-padding">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {equipe.map((membre, i) => (
              <MembreCard key={membre.id} membre={membre} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Section Fondateur */}
      <div className="py-16 bg-dark-2 border-t border-green-primary/10">
        <div className="container-site section-padding">
          <div className="max-w-3xl mx-auto">
            <p className="section-label text-center mb-8">À la tête du projet</p>
            <div className="bg-dark-card border border-green-primary/30 rounded-2xl overflow-hidden">
              <div className="h-1.5 bg-lime-gradient" />
              <div className="p-8 flex flex-col md:flex-row gap-7 items-start">
                <div className="shrink-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-lime/30">
                    <Image
                      src="/images/equipe/popy-traore.jpg"
                      alt="Popy Traoré"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <h2 className="font-display font-black text-3xl sm:text-4xl text-white">Popy Traoré</h2>
                    <span className="px-3 py-1 bg-lime/10 border border-lime/30 text-lime text-xs font-condensed font-bold tracking-wider uppercase rounded-full">
                      Fondateur & Organisateur
                    </span>
                  </div>
                  <p className="font-condensed text-green-light tracking-wider text-sm mb-3">
                    CEO · Popy Tech Agency · Consultant & Formateur Digital
                  </p>
                  <p className="font-body text-gray-400 text-sm leading-relaxed mb-5">
                    Popy Traoré initie, coordonne et porte la vision globale de The Digital Forum.
                    Il supervise l&apos;ensemble des équipes, la stratégie éditoriale de chaque édition
                    et garantit la qualité de l&apos;expérience pour les participants, speakers et partenaires.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="tel:+224612960453"
                      className="flex items-center gap-2 px-4 py-2 bg-dark-2 border border-green-primary/30 rounded-lg text-sm font-condensed text-gray-300 hover:text-white hover:border-green-primary transition-all"
                    >
                      <Phone size={13} className="text-lime" />
                      +224 612 960 453
                    </a>
                    <a
                      href="https://www.popytech.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-dark-2 border border-green-primary/30 rounded-lg text-sm font-condensed text-gray-300 hover:text-white hover:border-green-primary transition-all"
                    >
                      <ExternalLink size={13} className="text-lime" />
                      popytech.com
                    </a>
                    <Link
                      href="/a-propos"
                      className="flex items-center gap-2 px-4 py-2 bg-dark-2 border border-green-primary/30 rounded-lg text-sm font-condensed text-gray-300 hover:text-white hover:border-green-primary transition-all"
                    >
                      <ArrowRight size={13} className="text-lime" />
                      Biographie complète
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Rejoindre */}
      <div className="py-20 bg-dark-bg">
        <div className="container-site section-padding">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="section-title mb-4">
              Rejoins <span className="gradient-text">l&apos;équipe</span>
            </h2>
            <p className="font-body text-gray-400 mb-8 leading-relaxed">
              Tu es passionné(e) par l&apos;entrepreneuriat digital, l&apos;événementiel ou la
              communication ? Tu veux contribuer à l&apos;écosystème digital guinéen ? Rejoins
              l&apos;aventure The Digital Forum.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-3.5 bg-[#25D366] text-dark-bg font-condensed font-bold text-sm tracking-wider uppercase rounded-xl hover:brightness-110 transition-all active:scale-95"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Postuler via WhatsApp
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-3.5 border-2 border-green-primary/40 text-gray-300 font-condensed font-semibold text-sm tracking-wider uppercase rounded-xl hover:border-lime hover:text-lime transition-all"
              >
                <Mail size={15} />
                Envoyer un message
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
