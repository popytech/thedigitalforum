import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import LogoIcon from '@/components/ui/LogoIcon'
import { NAV_LINKS, CONTACT_PHONE, WHATSAPP_LINK } from '@/lib/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark-card border-t border-green-primary/20 mt-20">
      <div className="lime-bar" />
      <div className="container-site section-padding py-8 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <LogoIcon size={36} />
              <div>
                <div className="font-display text-lg sm:text-2xl text-white tracking-wider leading-tight">
                  THE DIGITAL FORUM
                </div>
                <div className="font-condensed text-[10px] sm:text-xs text-lime tracking-[0.15em] uppercase">
                  by Popy Tech Agency
                </div>
              </div>
            </Link>
            <p className="hidden sm:block font-body text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              La première série d&apos;événements trimestriels dédiés à l&apos;entrepreneuriat
              digital en Guinée. Speakers · Networking · Certification · Impact réel.
            </p>
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-dark-2 flex items-center justify-center text-gray-400 hover:text-white hover:bg-green-primary transition-all duration-200"
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-dark-2 flex items-center justify-center text-gray-400 hover:text-white hover:bg-green-primary transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-dark-2 flex items-center justify-center text-gray-400 hover:text-white hover:bg-green-primary transition-all duration-200"
                aria-label="WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-condensed font-semibold text-sm tracking-[0.15em] uppercase text-lime mb-5">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/inscription"
                  className="font-body text-sm text-lime hover:text-green-light transition-colors duration-200"
                >
                  S&apos;inscrire gratuitement →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-condensed font-semibold text-sm tracking-[0.15em] uppercase text-lime mb-5">
              Contact
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-green-primary mt-0.5 shrink-0" />
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className="font-body text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-green-primary mt-0.5 shrink-0" />
                <a
                  href="mailto:popy@popytech.com"
                  className="font-body text-sm text-gray-400 hover:text-white transition-colors"
                >
                  popy@popytech.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-green-primary mt-0.5 shrink-0" />
                <span className="font-body text-sm text-gray-400">
                  Conakry, Guinée
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-green-primary/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-gray-500 text-center">
            © {year} The Digital Forum · Organisé par{' '}
            <a
              href="https://www.popytech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime hover:text-green-light transition-colors"
            >
              Popy Tech Agency
            </a>
            . Tous droits réservés.
          </p>
          <div className="hidden sm:flex items-center gap-4 text-xs text-gray-600">
            <span>#TheDigitalForum</span>
            <span>#DigitalAfrique</span>
            <span>#Guinée</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
