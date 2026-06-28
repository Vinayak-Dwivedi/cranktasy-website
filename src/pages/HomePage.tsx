import { Page } from '../App'

import { FaSpotify, FaYoutube } from 'react-icons/fa'
import { SiApplemusic } from 'react-icons/si'
import Waveform from '../components/Waveform'

interface HomePageProps {
  onNavigate: (page: Page) => void
}

export default function HomePage({ onNavigate: _onNavigate }: HomePageProps) {
  return (
    <div className="relative h-[calc(100dvh-56px)] md:h-[calc(100dvh-72px)] w-full bg-black text-[#f0ede8] flex flex-col items-center justify-center p-4">
      
      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center justify-center gap-4 md:gap-6 max-h-full">
        
        {/* Title Group */}
        <div className="text-center animate-fade-up shrink-0">
          <h1 className="discography-heading text-[18vw] sm:text-[14vw] md:text-[110px] leading-[0.85] mb-1 md:mb-2 filter brightness-110 block text-center">
            COSMIC NIGHT
          </h1>
          <p className="font-mono-custom text-[clamp(10px,1.5vh,16px)] tracking-[0.4em] uppercase text-[#cccccc] opacity-80 text-md">
            OUT NOW
          </p>
        </div>

        {/* Visualizer */}
        <div className="animate-fade-up delay-100 flex items-center justify-center shrink-0">
          <Waveform bars={12} height="h-[clamp(24px,3.5vh,40px)]" barClassName="logo-gradient-bg" />
        </div>

        {/* Album Art Section (New Poster) */}
        <div className="relative group animate-fade-up delay-200 shrink-0">
          <div className="relative z-10 w-[clamp(280px,88vw,45dvh)] md:w-[320px] aspect-square bg-[#0d0d0d] border border-[#1a1a1a] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
            <img 
              src="/cosmic.nightt.jpg" 
              alt="Cosmic Night Poster" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-20"></div>
          </div>
        </div>

        {/* Streaming Icons */}
        <div className="flex gap-8 md:gap-14 animate-fade-up delay-300 items-center justify-center shrink-0">
          <svg width="0" height="0" className="absolute">
            <linearGradient id="iconGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#a0a0a0" />
            </linearGradient>
          </svg>
          <button className="hover:opacity-70 transition-opacity group">
            <FaSpotify style={{ fill: "url(#iconGradient)" }} className="w-[clamp(24px,4vh,32px)] h-[clamp(24px,4vh,32px)] group-hover:scale-110 transition-transform" />
          </button>
          <button className="hover:opacity-70 transition-opacity group">
            <SiApplemusic style={{ fill: "url(#iconGradient)" }} className="w-[clamp(24px,4vh,32px)] h-[clamp(24px,4vh,32px)] group-hover:scale-110 transition-transform" />
          </button>
          <button className="hover:opacity-70 transition-opacity group">
            <FaYoutube style={{ fill: "url(#iconGradient)" }} className="w-[clamp(24px,4vh,32px)] h-[clamp(24px,4vh,32px)] group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Note: Scroll indicator, Sound bar (right) and NEW RELEASE badge (center) are omitted as requested */}
    </div>
  )
}

