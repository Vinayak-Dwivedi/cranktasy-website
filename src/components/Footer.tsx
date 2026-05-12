import { FaSpotify, FaYoutube, FaInstagram, FaFacebookF, FaRegCopyright } from 'react-icons/fa'
import { SiApplemusic, SiGmail, SiX } from 'react-icons/si'

const socials = [
  { id: 'spotify', Icon: FaSpotify },
  { id: 'applemusic', Icon: SiApplemusic },
  { id: 'youtube', Icon: FaYoutube },
  { id: 'instagram', Icon: FaInstagram },
  { id: 'x', Icon: SiX },
  { id: 'facebook', Icon: FaFacebookF },
  { id: 'gmail', Icon: SiGmail },
]

export default function Footer() {
  return (
    <footer className="px-5 pb-3 bg-black flex flex-col gap-4">
      <div className="flex gap-6 sm:gap-6 justify-center flex-wrap relative">
        <svg width="0" height="0" className="absolute">
          <linearGradient id="footerIconGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#a0a0a0" />
          </linearGradient>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="10%" stopColor="#F3A8E2" />
            <stop offset="50%" stopColor="#C894F9" />
            <stop offset="90%" stopColor="#7B88FF" />
          </linearGradient>
        </svg>
        {socials.map(({ id, Icon }) => (
          <a
            key={id}
            href="#"
            className="hover:opacity-80 transition-opacity"
          >
            <Icon style={{ fill: "url(#footerIconGradient)" }} className="w-5 h-5 sm:w-5 sm:h-5 hover:scale-110 transition-transform" />
          </a>
        ))}
      </div>
      <div className="flex flex-col items-center gap-1.5 font-mono-custom text-center tracking-[0.08em]">
        <p className="text-[11px] md:text-[13px] font-mono-custom gray-gradient-text opacity-80">Intentional Sound.</p>
        <div className="flex flex-row items-center justify-center gap-1.5  whitespace-nowrap">
          <FaRegCopyright className="w-3.5 h-3.5 logo-gradient-text" style={{ fill: "url(#logoGradient)" }} />
          <span className="logo-gradient-text text-[12px] md:text-[14px] md:mr-5 mr-4  font-gotham">CrankTasy</span>
        </div>
      </div>
    </footer>
  )
}
