export interface Credit {
  role: string
  name: string
}

export interface Album {
  id: string
  name: string
  date: string // Kept for backwards compatibility if needed elsewhere
  year: string
  type: 'Single' | 'EP' | 'Album'
  length: string
  artKey: string
  writtenBy: string
  producedBy: string
  releaseDate: string
  genre: string
  isLight?: boolean
  credits?: Credit[]
}

export const albums: Album[] = [
  { 
    id: 'cosmic-night', 
    name: 'COSMIC NIGHT', 
    date: 'RELEASED 2024', 
    year: '2024', 
    type: 'Single', 
    length: '3:45', 
    artKey: 'cosmic', 
    writtenBy: 'CrankTasy', 
    producedBy: 'CrankTasy', 
    releaseDate: 'April 20, 2024', 
    genre: 'Electronic / Synthwave',
    credits: [
      { role: 'Music/Lyrics/Composition/Rap', name: 'CrankTasy' },
      { role: 'Vocals', name: 'Shivam K Mishra' },
      { role: 'Mix/Master & Post Production', name: 'JCD Production' },
      { role: 'Visuals', name: 'AyeChirag | Anedya Art | Infinity3d.s | Mnvshr' }
    ]
  },
]

