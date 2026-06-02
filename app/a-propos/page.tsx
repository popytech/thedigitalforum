import type { Metadata } from 'next'
import Image from 'next/image'
import { ExternalLink, Phone, Users } from 'lucide-react'
import LogoIcon from '@/components/ui/LogoIcon'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À Propos',
  description: 'En savoir plus sur The Digital Forum et son fondateur Popy Traoré, CEO de Popy Tech Agency.',
}

const valeurs = [
  { titre: 'Accessibilité', desc: 'Un événement gratuit et ouvert à tous, car le savoir ne doit pas avoir de prix.' },
  { titre: 'Impact concret', desc: 'Chaque édition produit des résultats mesurables chez les participants.' },
  { titre: 'Communauté', desc: 'Construire un écosystème digital fort et solidaire en Guinée et en Afrique.' },
  { titre: 'Excellence', desc: 'Des speakers triés sur le volet, un contenu de qualité, une organisation irréprochable.' },
]

const stats = [
  { value: '6', label: 'Éditions prévues en 2026-2027' },
  { value: '120', label: 'Participants par édition' },
  { value: '100%', label: 'Certifiant' },
  { value: 'Conakry', label: 'Capitale digitale de Guinée' },
]

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-dark-bg py-10 md:py-16">
      <div className="container-site section-padding">

        {/* The Digital Forum */}
        <section className="mb-14 md:mb-24">
          <div className="text-center mb-8 md:mb-12">
            <p className="section-label">Notre histoire</p>
            <h1 className="section-title mb-4">
              The Digital <span className="gradient-text">Forum</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-10 lg:mb-16">
            <div>
              <h2 className="font-display font-bold text-4xl text-lime mb-4">Notre vision</h2>
              <p className="font-body text-gray-300 leading-relaxed mb-4">
                The Digital Forum est né d&apos;un constat simple : en Guinée, des milliers de
                jeunes talentueux ont des compétences digitales mais manquent de l&apos;écosystème,
                des connexions et des connaissances pratiques pour en vivre.
              </p>
              <p className="font-body text-gray-400 leading-relaxed mb-6">
                Notre mission est de créer ce pont — entre le savoir et le faire, entre les
                entrepreneurs établis et les nouvelles générations, entre la Guinée et l&apos;Afrique
                digitale émergente.
              </p>
              <div className="flex items-center gap-3 p-4 bg-green-primary/10 border border-green-primary/20 rounded-xl">
                <LogoIcon size={48} />
                <div>
                  <div className="font-condensed font-bold text-white text-lg">THE DIGITAL FORUM</div>
                  <div className="font-body text-xs text-gray-400">
                    Speakers · Networking · Certification · Impact réel
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-dark-card border border-green-primary/20 rounded-xl p-5 text-center hover:border-green-primary/40 transition-all"
                >
                  <div className="font-display text-4xl text-lime mb-1">{stat.value}</div>
                  <div className="font-condensed text-xs text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Valeurs */}
          <h2 className="font-display font-bold text-4xl text-white mb-6">Nos valeurs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {valeurs.map((v) => (
              <div
                key={v.titre}
                className="bg-dark-card border border-green-primary/20 rounded-xl p-5 hover:border-lime/30 transition-all"
              >
                <div className="font-display text-xl text-lime mb-2">{v.titre}</div>
                <p className="font-body text-sm text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Popy Traoré */}
        <section className="mb-24 max-w-4xl mx-auto">
          <h2 className="section-title text-center mb-12">
            L&apos;<span className="gradient-text">organisateur</span>
          </h2>
          <div className="bg-dark-card border border-green-primary/30 rounded-2xl overflow-hidden">
            <div className="h-1.5 bg-lime-gradient" />
            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="shrink-0">
                  <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-lime/30">
                    <Image
                      src="/images/equipe/popy-traore.jpg"
                      alt="Popy Traoré"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-black text-4xl sm:text-5xl text-white mb-1">Popy Traoré</h3>
                  <p className="font-condensed text-lime tracking-wider uppercase mb-4">
                    CEO, Popy Tech Agency · Consultant & Formateur en Digital
                  </p>
                  <p className="font-body text-gray-300 leading-relaxed mb-4">
                    Entrepreneur digital basé en Guinée, Popy Traoré est le fondateur de
                    Popy Tech Agency, DigitalPro Academy et WatShop Africa. Avec plus de 500 vendeurs
                    accompagnés dans 12 pays africains, il est l&apos;une des figures montantes de
                    l&apos;entrepreneuriat digital en Afrique de l&apos;Ouest.
                  </p>
                  <p className="font-body text-gray-400 leading-relaxed mb-6">
                    Speaker au Sermon Entrepreneurial (mars 2026), il a créé The Digital Forum
                    pour démocratiser l&apos;accès aux connaissances digitales en Guinée et offrir
                    un espace de certification officielle à tous les participants.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="tel:+224612960453"
                      className="flex items-center gap-2 px-4 py-2 bg-dark-2 border border-green-primary/30 rounded-lg text-sm font-condensed text-gray-300 hover:text-white hover:border-green-primary transition-all"
                    >
                      <Phone size={14} className="text-lime" />
                      +224 612 960 453
                    </a>
                    <a
                      href="https://www.popytech.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-dark-2 border border-green-primary/30 rounded-lg text-sm font-condensed text-gray-300 hover:text-white hover:border-green-primary transition-all"
                    >
                      <ExternalLink size={14} className="text-lime" />
                      popytech.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popy Tech Agency */}
        <section>
          <h2 className="section-title text-center mb-12">
            Popy Tech <span className="gradient-text">Agency</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                titre: 'Popy Tech Agency',
                desc: 'Agence digitale spécialisée en développement web, marketing digital et accompagnement entrepreneurial en Guinée.',
                link: 'https://www.popytech.com',
                linkLabel: 'popytech.com',
              },
              {
                titre: 'WatsShop',
                desc: '500+ vendeurs actifs dans 12 pays africains. La plateforme e-commerce qui révolutionne le commerce en ligne en Afrique.',
                link: 'https://watshop.africa',
                linkLabel: 'watshop.vercel.app',
              },
              {
                titre: 'DigitalPro Academy',
                desc: 'Formations digitales certifiantes pour entrepreneurs, freelances et professionnels souhaitant maîtriser les outils du digital.',
                link: '#',
                linkLabel: 'En savoir plus',
              },
            ].map((item) => (
              <div
                key={item.titre}
                className="bg-dark-card border border-green-primary/20 rounded-xl p-6 hover:border-green-primary/40 hover:shadow-green-sm transition-all"
              >
                <h3 className="font-display text-2xl text-lime mb-3">{item.titre}</h3>
                <p className="font-body text-sm text-gray-400 leading-relaxed mb-4">{item.desc}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-condensed text-green-light hover:text-lime transition-colors tracking-wider uppercase"
                >
                  {item.linkLabel} <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Lien équipe */}
        <section className="mt-16 pt-16 border-t border-green-primary/10">
          <div className="bg-dark-card border border-green-primary/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-green-primary/15 border border-green-primary/30 rounded-xl flex items-center justify-center shrink-0">
                <Users size={24} className="text-lime" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-white mb-1">L&apos;équipe The Digital Forum</h3>
                <p className="font-body text-sm text-gray-400">
                  Designers, photographes, community managers… Découvrez les profils qui font vivre l&apos;événement.
                </p>
              </div>
            </div>
            <Link
              href="/equipe"
              className="shrink-0 flex items-center gap-2 px-6 py-3 bg-green-primary border-2 border-green-primary text-white font-condensed font-semibold text-sm tracking-wider uppercase rounded-xl transition-all hover:bg-green-mid hover:shadow-green-md active:scale-95 whitespace-nowrap"
            >
              Voir l&apos;équipe →
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
