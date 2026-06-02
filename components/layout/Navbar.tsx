'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/constants'
import LogoIcon from '@/components/ui/LogoIcon'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lastY, setLastY] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setIsScrolled(currentY > 50)
      setIsHidden(currentY > lastY && currentY > 150)
      setLastY(currentY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastY])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <div className="lime-bar fixed top-0 left-0 right-0 z-50" />
      <motion.header
        animate={{ y: isHidden ? '-100%' : '0%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed top-1 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-dark-bg/95 backdrop-blur-md shadow-green-sm border-b border-green-primary/10'
            : 'bg-transparent'
        )}
      >
        <div className="container-site section-padding">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <LogoIcon size={36} />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-xl text-white tracking-wider">
                  THE DIGITAL FORUM
                </span>
                <span className="font-condensed text-xs text-lime tracking-[0.15em] uppercase">
                  Popy Tech Agency
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-condensed text-sm tracking-wider uppercase transition-colors duration-200',
                    pathname === link.href
                      ? 'text-lime'
                      : 'text-gray-300 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/inscription"
                className="hidden md:inline-flex items-center px-5 py-2 bg-green-primary border border-green-primary text-white font-condensed text-sm font-semibold tracking-wider uppercase rounded-lg transition-all duration-200 hover:bg-green-mid hover:border-green-mid"
              >
                S&apos;inscrire
              </Link>
              <button
                className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[68px] left-0 right-0 z-30 bg-dark-bg/98 backdrop-blur-md border-b border-green-primary/20"
          >
            <nav className="container-site section-padding py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-condensed text-base tracking-wider uppercase py-2 border-b border-dark-2 transition-colors',
                    pathname === link.href ? 'text-lime' : 'text-gray-300 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/inscription"
                className="mt-2 text-center px-6 py-3 bg-green-primary text-white font-condensed font-semibold tracking-wider uppercase rounded-lg"
              >
                S&apos;inscrire gratuitement
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-[68px]" />
    </>
  )
}
