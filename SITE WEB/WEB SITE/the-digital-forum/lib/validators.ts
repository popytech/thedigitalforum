import { z } from 'zod'

export const inscriptionStep1Schema = z.object({
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  telephone: z
    .string()
    .min(8, 'Numéro invalide')
    .regex(/^[+\d\s()-]+$/, 'Format de téléphone invalide'),
  email: z.string().email('Adresse email invalide'),
  ville: z.string().min(2, 'Veuillez indiquer votre ville'),
})

export const inscriptionStep2Schema = z.object({
  statut_pro: z.enum(
    ['Étudiant', 'Entrepreneur', 'Freelance', 'Salarié', 'Créateur', 'Autre'] as const,
    { error: 'Veuillez sélectionner votre statut' }
  ),
  secteur: z.string().min(2, 'Veuillez indiquer votre secteur'),
  source: z.string().min(2, "Veuillez indiquer comment vous avez connu l'événement"),
})

export const inscriptionStep3Schema = z.object({
  attentes: z
    .string()
    .min(20, 'Veuillez développer vos attentes (min. 20 caractères)'),
  question_qa: z.string().optional(),
})

export const inscriptionFullSchema = inscriptionStep1Schema
  .merge(inscriptionStep2Schema)
  .merge(inscriptionStep3Schema)

export const contactSchema = z.object({
  nom: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(8, 'Téléphone invalide'),
  objet: z.enum(['Inscription', 'Sponsoring', 'Partenariat', 'Autre'] as const, {
    error: 'Veuillez sélectionner un objet',
  }),
  message: z.string().min(20, 'Le message doit contenir au moins 20 caractères'),
})

export const sponsorContactSchema = z.object({
  nom: z.string().min(2, 'Le nom est requis'),
  entreprise: z.string().min(2, "Le nom de l'entreprise est requis"),
  pack: z.enum(['bronze', 'argent', 'or', 'officiel'] as const, {
    error: 'Veuillez sélectionner un pack',
  }),
  telephone: z.string().min(8, 'Téléphone invalide'),
  message: z.string().min(10, 'Veuillez décrire votre demande'),
})

export const newsletterSchema = z.object({
  email: z.string().email('Email invalide'),
  whatsapp: z.string().optional(),
})

export type InscriptionStep1 = z.infer<typeof inscriptionStep1Schema>
export type InscriptionStep2 = z.infer<typeof inscriptionStep2Schema>
export type InscriptionStep3 = z.infer<typeof inscriptionStep3Schema>
export type InscriptionFull = z.infer<typeof inscriptionFullSchema>
export type ContactSchema = z.infer<typeof contactSchema>
export type SponsorContactSchema = z.infer<typeof sponsorContactSchema>
export type NewsletterSchema = z.infer<typeof newsletterSchema>
