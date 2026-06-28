export function GhostArt() {
  return (
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="300" height="300" fill="#0d0d0d"/>
      <circle cx="150" cy="150" r="100" fill="none" stroke="#ffffff" strokeWidth="0.5"/>
      <circle cx="150" cy="150" r="120" fill="none" stroke="#ffffff" strokeWidth="0.5"/>
      <path d="M120 100 Q150 55 180 100 Q205 155 150 185 Q95 155 120 100Z" fill="#1a1a1a" stroke="#ffffff" strokeWidth="1"/>
      <circle cx="138" cy="115" r="7" fill="#ffffff"/>
      <circle cx="162" cy="115" r="7" fill="#ffffff"/>
      <path d="M133 138 Q150 148 167 138" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <text x="150" y="255" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#ffffff" letterSpacing="5">GHOST</text>
      <text x="150" y="268" textAnchor="middle" fontFamily="monospace" fontSize="5" fill="#ffffff" letterSpacing="5">DARK WAVE</text>
    </svg>
  )
}

export function VoidArt() {
  return (
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="300" height="300" fill="#0a0a12"/>
      <circle cx="150" cy="140" r="90" fill="none" stroke="#1a1a2e" strokeWidth="1"/>
      <circle cx="150" cy="140" r="65" fill="none" stroke="#252535" strokeWidth="1"/>
      <circle cx="150" cy="140" r="40" fill="#1a1a2e"/>
      <circle cx="150" cy="140" r="20" fill="#0f0f20"/>
      <path d="M125 115 L150 88 L175 115 L168 148 L150 162 L132 148Z" fill="#1f1f35" stroke="#2a2a45" strokeWidth="1"/>
      <circle cx="141" cy="128" r="5" fill="#0a0a15"/>
      <circle cx="159" cy="128" r="5" fill="#0a0a15"/>
      <text x="150" y="255" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#333" letterSpacing="5">VOID</text>
      <text x="150" y="268" textAnchor="middle" fontFamily="monospace" fontSize="5" fill="#2a2a2a" letterSpacing="4">DARK WAVE</text>
    </svg>
  )
}

export function StaticArt() {
  return (
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="300" height="300" fill="#0a0c10"/>
      {[70, 90, 115, 150, 175, 205, 230].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="300" y2={y + (i % 2 === 0 ? -3 : 5)} stroke={i === 3 ? '#252535' : '#1a2030'} strokeWidth={i === 3 ? 3 : 1}/>
      ))}
      <text x="150" y="165" textAnchor="middle" fontFamily="monospace" fontSize="36" fontWeight="900" fill="#2a3040" letterSpacing="6">STATIC</text>
      <text x="150" y="268" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="#333" letterSpacing="4">DARK WAVE</text>
    </svg>
  )
}

export function EchoArt() {
  return (
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="300" height="300" fill="#e8e3d8"/>
      <rect x="0" y="210" width="300" height="90" fill="#c8c0a8"/>
      <rect x="55" y="75" width="190" height="225" fill="#b8b0a0"/>
      <rect x="75" y="55" width="150" height="245" fill="#a8a098"/>
      <rect x="115" y="0" width="70" height="300" fill="#989088"/>
      <rect x="132" y="0" width="36" height="300" fill="#888078"/>
      <rect x="143" y="0" width="14" height="300" fill="#787068"/>
      <text x="150" y="275" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6a6058" letterSpacing="4">ECHO</text>
    </svg>
  )
}

export function PulseArt() {
  return (
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="300" height="300" fill="#080808"/>
      {[90, 70, 50, 30, 15].map((r, i) => (
        <circle key={i} cx="150" cy="150" r={r} fill="none" stroke={`rgba(42,42,42,${0.4 + i * 0.15})`} strokeWidth="1.5"/>
      ))}
      <circle cx="150" cy="150" r="20" fill="#1a1a1a"/>
      <circle cx="150" cy="150" r="8" fill="#222"/>
      <text x="150" y="155" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="#444" letterSpacing="2">PULSE</text>
      <text x="150" y="262" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="#333" letterSpacing="4">DARK WAVE</text>
      <line x1="0" y1="150" x2="58" y2="150" stroke="#2a2a2a" strokeWidth="0.8"/>
      <line x1="242" y1="150" x2="300" y2="150" stroke="#2a2a2a" strokeWidth="0.8"/>
    </svg>
  )
}

export function ShockArt() {
  return (
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="300" height="300" fill="#111"/>
      <text x="150" y="175" textAnchor="middle" fontFamily="monospace" fontSize="56" fontWeight="900" fill="#1f1f1f" letterSpacing="8">SHOCK</text>
      <rect x="128" y="55" width="44" height="88" rx="22" fill="#2a2a2a"/>
      <rect x="138" y="143" width="24" height="65" fill="#2a2a2a"/>
      <rect x="105" y="148" width="34" height="13" rx="6" fill="#222" transform="rotate(-22 122 154)"/>
      <rect x="161" y="148" width="34" height="13" rx="6" fill="#222" transform="rotate(22 178 154)"/>
      <text x="150" y="272" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="#333" letterSpacing="4">DARK WAVE GETS DOWN TOWN</text>
    </svg>
  )
}

export function IndustrialSceneArt() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="140" fill="#1a1a1a"/>
      <rect x="20" y="40" width="30" height="80" fill="#2a2a2a" rx="2"/>
      <rect x="55" y="20" width="20" height="100" fill="#333" rx="1"/>
      <rect x="80" y="50" width="50" height="60" fill="#252525" rx="3"/>
      <rect x="82" y="55" width="46" height="25" fill="#1a1a1a" rx="1"/>
      <circle cx="88" cy="67" r="5" fill="#444"/>
      <circle cx="100" cy="67" r="5" fill="#444"/>
      <circle cx="112" cy="67" r="5" fill="#444"/>
      <rect x="82" y="84" width="46" height="3" fill="#333"/>
      <rect x="82" y="89" width="30" height="3" fill="#333"/>
      <rect x="140" y="30" width="25" height="90" fill="#2a2a2a" rx="2"/>
      <rect x="170" y="60" width="15" height="60" fill="#333" rx="1"/>
      <line x1="0" y1="120" x2="200" y2="120" stroke="#333" strokeWidth="1"/>
      <rect x="0" y="120" width="200" height="20" fill="#111"/>
    </svg>
  )
}

export function BerlinArt() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="140" fill="#111"/>
      <circle cx="160" cy="50" r="32" fill="none" stroke="#2a2a2a" strokeWidth="1"/>
      <circle cx="160" cy="50" r="22" fill="none" stroke="#333" strokeWidth="1"/>
      <circle cx="160" cy="50" r="11" fill="#2a2a2a"/>
      <text x="18" y="82" fontFamily="monospace" fontSize="26" fontWeight="900" fill="#2a2a2a" letterSpacing="2">BERLIN</text>
      <text x="18" y="108" fontFamily="monospace" fontSize="12" fill="#333" letterSpacing="5">WINS</text>
    </svg>
  )
}

export function CosmicArt() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <img 
        src="/cosmic.nightt.jpg" 
        alt="Cosmic Night" 
        className="w-full h-full object-cover"
      />
    </div>
  )
}

