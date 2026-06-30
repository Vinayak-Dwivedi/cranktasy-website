import { FaSpotify, FaYoutube, FaInstagram, FaFacebookF, FaRegCopyright } from 'react-icons/fa'
import { SiApplemusic, SiGmail, SiX } from 'react-icons/si'

const socials = [
  { id: 'spotify', Icon: FaSpotify, url: 'https://open.spotify.com/artist/5x77VfVGAxtyv3ecJNzuSi?si=4UwMbAwsSGefPAnKG2alhg' },
  { id: 'applemusic', Icon: SiApplemusic, url: 'https://itunes.apple.com/us/artist/cranktasy/6781806828' },
  { id: 'youtube', Icon: FaYoutube, url: 'https://www.youtube.com/@CrankTasy' },
  { id: 'instagram', Icon: FaInstagram, url: 'https://www.instagram.com/cranktasy' },
  { id: 'x', Icon: SiX, url: 'https://x.com/cranktasy' },
  { id: 'facebook', Icon: FaFacebookF, url: 'https://www.facebook.com/cranktasy' },
  { id: 'gmail', Icon: SiGmail, url: 'mailto:work.cranktasy@gmail.com' },
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
        {socials.map(({ id, Icon, url }) => (
          <a
            key={id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
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
