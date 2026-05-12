import { Page } from '../App'
import Footer from './Footer'

interface NavOverlayProps {
  open: boolean
  currentPage: Page
  onNavigate: (page: Page) => void
  onClose: () => void
}

export default function NavOverlay({ open, currentPage, onNavigate, onClose: _onClose }: NavOverlayProps) {
  return (
    <div
      className={`fixed inset-0 z-[150] bg-black transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] pb-[env(safe-area-inset-bottom)] ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >

      <div className="flex flex-col h-full pt-24 pb-0 px-5">
        <svg width="0" height="0" className="absolute">
          <linearGradient id="navIconGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#a0a0a0" />
          </linearGradient>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="10%" stopColor="#F3A8E2" />
            <stop offset="50%" stopColor="#C894F9" />
            <stop offset="90%" stopColor="#7B88FF" />
          </linearGradient>
        </svg>

        <div className="flex-1 flex flex-col items-center justify-center gap-[86px] md:gap-4">
          <button
            onClick={() => onNavigate('disco')}
            className={`font-heading-stack text-[48px] sm:text-[68px] md:text-[86px] leading-[0.85] tracking-[0.02em] text-center uppercase transition-all duration-300 w-full ${
              currentPage === 'disco' ? 'discography-heading' : 'text-white/40 hover:text-white/60'
            }`}
          >
            Music
          </button>
          <button
            onClick={() => onNavigate('collab')}
            className={`font-heading-stack text-[48px] sm:text-[68px] md:text-[86px] leading-[0.85] tracking-[0.02em] text-center uppercase transition-all duration-300 w-full ${
              currentPage === 'collab' ? 'discography-heading' : 'text-white/40 hover:text-white/60'
            }`}
          >
            Collaborate
          </button>
        </div>

        {/* Footer socials */}
        <div className="mt-auto w-full">
          <Footer />
        </div>
      </div>
    </div>
  )
}
