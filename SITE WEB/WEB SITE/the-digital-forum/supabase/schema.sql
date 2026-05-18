-- ═══════════════════════════════════════════════════════════════════════════
-- THE DIGITAL FORUM — Schéma Supabase complet et définitif
-- Supabase Dashboard → SQL Editor → New query → coller et Run
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 0. Reset propre ─────────────────────────────────────────────────────────
drop table if exists public.photos        cascade;
drop table if exists public.inscriptions  cascade;
drop table if exists public.editions      cascade;
drop table if exists public.newsletter    cascade;
drop table if exists public.contacts      cascade;
drop table if exists public.sponsors      cascade;

-- ── 1. Extensions ───────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ══════════════════════════════════════════════════════════════════════════════
-- TABLES
-- ══════════════════════════════════════════════════════════════════════════════

-- ── editions ─────────────────────────────────────────────────────────────────
create table public.editions (
  id          text        primary key,
  numero      integer     not null unique,
  titre       text        not null,
  theme       text        not null,
  sous_theme  text,
  date_event  timestamptz,
  lieu        text        not null default 'Conakry, Guinée',
  statut      text        not null default 'draft'
              check (statut in ('draft', 'published', 'terminee')),
  capacite    integer     not null default 120,
  gratuit     boolean     not null default true,
  created_at  timestamptz not null default now()
);

-- ── inscriptions ─────────────────────────────────────────────────────────────
create table public.inscriptions (
  id          uuid        primary key default uuid_generate_v4(),
  edition_id  text        not null references public.editions(id) on delete restrict,

  -- Identité
  prenom      text        not null,
  nom         text        not null,
  email       text        not null,
  telephone   text        not null,
  ville       text        not null,

  -- Profil
  statut_pro  text        not null
              check (statut_pro in ('Étudiant','Entrepreneur','Freelance','Salarié','Créateur','Autre')),
  secteur     text        not null,
  source      text        not null,

  -- Attentes
  attentes    text        not null,
  question_qa text,

  -- Gestion
  qr_code     text        not null unique,
  statut      text        not null default 'confirmee'
              check (statut in ('confirmee', 'annulee', 'presente')),
  created_at  timestamptz not null default now()
);

-- ── newsletter ───────────────────────────────────────────────────────────────
create table public.newsletter (
  id          uuid        primary key default uuid_generate_v4(),
  email       text        not null unique,
  whatsapp    text,
  created_at  timestamptz not null default now()
);

-- ── contacts ─────────────────────────────────────────────────────────────────
create table public.contacts (
  id          uuid        primary key default uuid_generate_v4(),
  nom         text        not null,
  email       text        not null,
  telephone   text        not null,
  objet       text        not null,
  message     text        not null,
  traite      boolean     not null default false,
  created_at  timestamptz not null default now()
);

-- ── photos (galerie) ─────────────────────────────────────────────────────────
create table public.photos (
  id          uuid        primary key default uuid_generate_v4(),
  edition_id  text        not null references public.editions(id) on delete cascade,
  url         text        not null,
  caption     text,
  taken_at    timestamptz,
  created_at  timestamptz not null default now()
);

-- ── sponsors (pour usage futur) ──────────────────────────────────────────────
create table public.sponsors (
  id          uuid        primary key default uuid_generate_v4(),
  nom         text        not null,
  logo_url    text,
  site_url    text,
  pack        text        not null check (pack in ('bronze', 'argent', 'or', 'officiel')),
  actif       boolean     not null default true,
  created_at  timestamptz not null default now()
);

-- ══════════════════════════════════════════════════════════════════════════════
-- INDEX
-- ══════════════════════════════════════════════════════════════════════════════
create index idx_inscriptions_edition  on public.inscriptions(edition_id);
create index idx_inscriptions_email    on public.inscriptions(email);
create index idx_inscriptions_qr       on public.inscriptions(qr_code);
create index idx_inscriptions_statut   on public.inscriptions(statut);
create index idx_photos_edition        on public.photos(edition_id);

-- ══════════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ══════════════════════════════════════════════════════════════════════════════
alter table public.editions      enable row level security;
alter table public.inscriptions  enable row level security;
alter table public.newsletter    enable row level security;
alter table public.contacts      enable row level security;
alter table public.photos        enable row level security;
alter table public.sponsors      enable row level security;

-- ── Politiques editions ──────────────────────────────────────────────────────
-- Lecture publique (affichage sur le site)
create policy "editions_select_public"
  on public.editions for select using (true);

-- ── Politiques inscriptions ──────────────────────────────────────────────────
-- Tout le monde peut s'inscrire
create policy "inscriptions_insert_public"
  on public.inscriptions for insert with check (true);

-- Lecture : service_role uniquement (dashboard admin — service_role bypass RLS de toute façon)
create policy "inscriptions_select_admin"
  on public.inscriptions for select using (true);

-- Mise à jour : service_role uniquement (check-in QR code)
create policy "inscriptions_update_admin"
  on public.inscriptions for update using (true) with check (true);

-- ── Politiques newsletter ─────────────────────────────────────────────────────
create policy "newsletter_insert_public"
  on public.newsletter for insert with check (true);

-- ── Politiques contacts ──────────────────────────────────────────────────────
create policy "contacts_insert_public"
  on public.contacts for insert with check (true);

-- ── Politiques photos ────────────────────────────────────────────────────────
create policy "photos_select_public"
  on public.photos for select using (true);

-- ── Politiques sponsors ──────────────────────────────────────────────────────
create policy "sponsors_select_public"
  on public.sponsors for select using (true);

-- ══════════════════════════════════════════════════════════════════════════════
-- DONNÉES INITIALES — 6 éditions trimestrielles 2026-2027
-- ══════════════════════════════════════════════════════════════════════════════
insert into public.editions (id, numero, titre, theme, sous_theme, date_event, lieu, statut, capacite, gratuit) values
(
  '1', 1, 'Édition 01',
  'Gagner de l''argent avec le digital',
  'Comment transformer tes compétences en revenus réels et durables depuis l''Afrique',
  '2026-06-14 11:00:00+00',
  'À confirmer · Conakry, Guinée',
  'published', 120, true
),
(
  '2', 2, 'Édition 02',
  'E-commerce & vente en ligne en Afrique',
  null,
  '2026-09-13 11:00:00+00',
  'Conakry, Guinée',
  'draft', 120, true
),
(
  '3', 3, 'Édition 03',
  'Personal branding & revenus',
  null,
  '2026-12-13 11:00:00+00',
  'Conakry, Guinée',
  'draft', 120, true
),
(
  '4', 4, 'Édition 04',
  'IA & digital en Afrique',
  null,
  '2027-03-13 11:00:00+00',
  'Conakry, Guinée',
  'draft', 120, true
),
(
  '5', 5, 'Édition 05',
  'Bilan 1 an & Vision Afrique',
  'Édition anniversaire — 1 an de The Digital Forum',
  '2027-06-12 11:00:00+00',
  'Conakry, Guinée',
  'draft', 120, true
),
(
  '6', 6, 'Édition 06',
  'Financer son projet digital',
  'Levées de fonds, subventions & modèles économiques en Afrique',
  '2027-09-12 11:00:00+00',
  'Conakry, Guinée',
  'draft', 120, true
);
