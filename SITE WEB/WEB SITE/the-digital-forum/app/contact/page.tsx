import type { Metadata } from 'next'
import { Phone, MapPin, MessageCircle } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'
import { CONTACT_PHONE, WHATSAPP_LINK } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez The Digital Forum pour toute question d\'inscription, de sponsoring ou de partenariat.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark-bg py-16">
      <div className="container-site section-padding">
        <div className="text-center mb-12">
          <p className="section-label">On vous répond</p>
          <h1 className="section-title mb-4">
            Nous <span className="gradient-text">contacter</span>
          </h1>
          <p className="font-body text-gray-400 max-w-xl mx-auto">
            Une question sur l&apos;événement, le sponsoring ou un partenariat ? Écrivez-nous.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 max-w-5xl mx-auto">
          {/* Infos */}
          <div className="flex flex-col gap-5">
            <div className="bg-dark-card border border-green-primary/20 rounded-xl p-5 hover:border-green-primary/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-primary/20 rounded-lg flex items-center justify-center">
                  <Phone size={18} className="text-lime" />
                </div>
                <span className="font-condensed font-semibold text-sm text-white uppercase tracking-wider">
                  Téléphone
                </span>
              </div>
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="font-body text-gray-300 hover:text-white transition-colors"
              >
                {CONTACT_PHONE}
              </a>
            </div>

            <div className="bg-dark-card border border-green-primary/20 rounded-xl p-5 hover:border-green-primary/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-primary/20 rounded-lg flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#A8FF78">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <span className="font-condensed font-semibold text-sm text-white uppercase tracking-wider">
                  WhatsApp
                </span>
              </div>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-gray-300 hover:text-lime transition-colors"
              >
                Message direct →
              </a>
            </div>

            <div className="bg-dark-card border border-green-primary/20 rounded-xl p-5 hover:border-green-primary/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-primary/20 rounded-lg flex items-center justify-center">
                  <MapPin size={18} className="text-lime" />
                </div>
                <span className="font-condensed font-semibold text-sm text-white uppercase tracking-wider">
                  Localisation
                </span>
              </div>
              <span className="font-body text-gray-300">Conakry, Guinée</span>
            </div>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-3 bg-[#25D366] text-dark-bg font-condensed font-bold text-sm tracking-wider uppercase rounded-xl hover:brightness-110 transition-all active:scale-95"
            >
              <MessageCircle size={16} />
              WhatsApp Direct
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
