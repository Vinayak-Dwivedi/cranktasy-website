import { useState, useEffect } from 'react'
import Waveform from '../components/Waveform'
import { GhostArt, VoidArt, StaticArt, EchoArt, PulseArt, ShockArt, CosmicArt } from '../components/AlbumArts'
import { albums, Album } from '../data/albums'
import { FaSpotify, FaYoutube } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { SiApplemusic } from 'react-icons/si'

const artMap: Record<string, React.ComponentType> = {
  ghost: GhostArt,
  void: VoidArt,
  static: StaticArt,
  echo: EchoArt,
  pulse: PulseArt,
  shock: ShockArt,
  cosmic: CosmicArt,
}

type Tab = 'SINGLES' | 'EPS' | 'ALBUMS'

export default function DiscographyPage() {
  const [activeTab, setActiveTab] = useState<Tab>('SINGLES')
  const [selectedTrack, setSelectedTrack] = useState<Album | null>(null)

  // Filter albums by tab
  const filteredAlbums = albums.filter((a) => {
    if (activeTab === 'SINGLES') return a.type === 'Single'
    if (activeTab === 'EPS') return a.type === 'EP'
    if (activeTab === 'ALBUMS') return a.type === 'Album'
    return true
  })

  // Prevent background scrolling when modal is open on mobile
  useEffect(() => {
    if (window.innerWidth < 1024 && selectedTrack) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedTrack])

  return (
    <div className="bg-black min-h-[calc(100dvh-56px)] md:min-h-[calc(100dvh-72px)] w-full text-[#f0ede8] flex flex-col pt-6 md:pt-24 pb-16 px-5 md:px-12 lg:px-24">
      <div className="w-full max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 lg:mb-12 flex flex-col items-center text-center md:items-start md:text-left">
          <h1 className="discography-heading text-[18vw] sm:text-[14vw] md:text-[120px] leading-[0.85] mb-4">
            DISCOGRAPHY
          </h1>
          <div className="w-full flex ml-16 md:ml-1 justify-start  md:justify-start">
            <Waveform bars={7} height="h-6" barClassName="discography-bg" />
          </div>
        </div>

        {/* Action Bar (Tabs) */}
        <div className="logo-gradient-border-full w-fit mb-12 mx-auto md:mx-0">
          <div className="bg-black rounded-full flex overflow-hidden">
            {(['SINGLES', 'EPS', 'ALBUMS'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSelectedTrack(null); }}
                className={`px-8 py-3 rounded-full transition-all duration-300 tabs-custom ${
                  activeTab === tab 
                    ? 'bg-white !text-black' 
                    : 'hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          
          {/* Left Column: Track List */}
          <div 
            className="transition-all duration-500 ease-in-out w-full lg:w-[80%] xl:w-[70%] mx-auto"
          >
            {/* Section Title */}
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-mono-custom text-[18px] md:text-[22px] gradient-heading-bebas  tracking-[0.1em]">
                {activeTab}
              </h2>
              <div className="flex-grow h-[1px] bg-[#2a2a2a]"></div>
            </div>

            {/* List */}
            <div className="flex flex-col gap-4">
              {filteredAlbums.length > 0 ? filteredAlbums.map((album) => {
                const isSelected = selectedTrack?.id === album.id
                const Art = artMap[album.artKey]

                return (
                  <div
                    key={album.id}
                    onClick={() => setSelectedTrack(album)}
                    className="gradient-border-wrapper cursor-pointer group transition-all duration-300"
                  >
                    <div className={`gradient-border-inner flex items-center justify-between p-3 md:p-4 transition-all duration-300 ${
                      isSelected ? 'bg-white' : 'bg-[#0a0a0a] group-hover:bg-[#111]'
                    }`}>
                      <div className="flex items-center gap-5 md:gap-6">
                        {/* Thumbnail Art */}
                        <div className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] bg-[#050505] rounded-md overflow-hidden flex-shrink-0">
                          <Art />
                        </div>
                        
                        {/* Track Details */}
                        <div>
                          <h3 className={`font-condensed gradient-heading-bebas text-[24px] md:text-[28px] font-bold tracking-[0.03em] leading-none mb-1 transition-colors ${
                            isSelected ? 'text-black' : 'text-[#f0ede8] group-hover:text-white'
                          }`}>
                            {album.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }) : (
                <div className="py-20"></div>
              )}
            </div>
          </div>

          {/* Centered Overlay Detail Panel */}
          {selectedTrack && (
            <div className="fixed  inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-10">
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in cursor-pointer"
                onClick={() => setSelectedTrack(null)}
              ></div>
              
              {/* Content Panel */}
              {/* Content Panel */}
              <div className="relative w-full max-w-2xl max-h-[85vh] md:max-h-[90vh] logo-gradient-container rounded-[22px] shadow-2xl animate-fade-up flex flex-col overflow-hidden">
                <div className="bg-[#0a0a0a] w-full h-full rounded-[21px] overflow-y-auto no-scrollbar p-6 md:p-10 relative">
                  
                  {/* Close Button */}
                <button 
                  onClick={() => setSelectedTrack(null)}
                  className="absolute top-4 right-4 text-[#ccc] hover:text-white transition-colors z-[210] p-2 hover:bg-white/5 rounded-full"
                >
                  <IoClose className="w-8 h-8 md:w-6 md:h-6" />
                </button>

                {/* Hero Art */}
                <div className="flex items-center justify-center">
                <div className="w-full aspect-square max-w-[320px] mx-auto lg:mx-0 bg-[#050505] rounded-xl overflow-hidden mb-6 lg:mb-8">
                  {(()=>{const BigArt = artMap[selectedTrack.artKey]; return <BigArt/>})()}
                </div>
                 </div>
                {/* Title Block */}
                <div className="mb-8 flex flex-col md:flex-row justify-between">
             
                  <h2 className="font-bebas gradient-heading-bebas text-[48px] text-center md:text-[56px] leading-[0.9] tracking-[0.03em] mb-2">
                    {selectedTrack.name}
                  </h2>
                      <div className="flex gap-4 md:gap-5 animate-fade-up delay-300 items-center justify-center">
                            <svg width="0" height="0" className="absolute">
                              <linearGradient id="modalIconGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="100%" stopColor="#a0a0a0" />
                              </linearGradient>
                            </svg>
                            <button className="hover:opacity-70 transition-opacity group">
                              <FaSpotify style={{ fill: "url(#modalIconGradient)" }} className="w-[clamp(24px,4vh,32px)] h-[clamp(24px,4vh,32px)] group-hover:scale-110 transition-transform" />
                            </button>
                            <button className="hover:opacity-70 transition-opacity group">
                              <SiApplemusic style={{ fill: "url(#modalIconGradient)" }} className="w-[clamp(24px,4vh,32px)] h-[clamp(24px,4vh,32px)] group-hover:scale-110 transition-transform" />
                            </button>
                            <button className="hover:opacity-70 transition-opacity group">
                              <FaYoutube style={{ fill: "url(#modalIconGradient)" }} className="w-[clamp(24px,4vh,32px)] h-[clamp(24px,4vh,32px)] group-hover:scale-110 transition-transform" />
                            </button>
                          
                        
                          </div>
                </div>

                <div className="h-[1px] w-full bg-[#2a2a2a] mb-8"></div>

                {/* Track Info Section */}
                <div className="mb-auto">
                  <h4 className="font-inter gradient-heading-bebas text-[11px] md:text-[13px] font-semibold text-[#888] tracking-[0.2em] mb-4 flex items-center gap-2 uppercase">
                    CREDITS
                  </h4>
                  
                  <div className="grid grid-cols-[1fr,auto] gap-y-4 gap-x-12 font-inter text-[11px] md:text-[13px]">
                    {selectedTrack.credits ? (
                      selectedTrack.credits.map((credit, index) => (
                        <div key={index} className="contents">
                          <span className="text-[#666]  tracking-[0.05em]">{credit.role}</span>
                          <span className="font-outfit text-[#f0ede8] text-left">{credit.name}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        <span className="text-[#666] tracking-[0.05em]">Written by</span>
                        <span className="font-outfit text-[#f0ede8] text-left">{selectedTrack.writtenBy}</span>
                        <span className="text-[#666]  tracking-[0.05em]">Produced by</span>
                        <span className="font-outfit text-[#f0ede8] text-left">{selectedTrack.producedBy}</span>
                      </>
                    )}
                  </div>
                </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
