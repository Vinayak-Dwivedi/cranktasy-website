import { useState } from 'react'
import Waveform from '../components/Waveform'
import Footer from '../components/Footer'
import { MdOutlineLink } from 'react-icons/md'
import Toast from '../components/Toast'
import { motion } from 'framer-motion'

interface FormState {
  name: string
  email: string
  description: string
}

export default function CollaborationPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    description: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
  const [linkInput, setLinkInput] = useState('')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false,
  })

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    
    // Validation
    if (!form.name.trim()) {
      setToast({ message: 'Please enter your name', type: 'error', isVisible: true })
      return
    }
    if (!validateEmail(form.email.trim())) {
      setToast({ message: 'Please enter a valid email address', type: 'error', isVisible: true })
      return
    }
    if (!form.description.trim()) {
      setToast({ message: 'Please tell us about your work', type: 'error', isVisible: true })
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/collaborate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.description,
        }),
      })

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // Handle non-JSON response (like a 404 HTML page)
        const text = await response.text();
        console.error('Server returned non-JSON response:', text);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      if (response.ok && data.success) {
        setSubmitted(true)
        setForm({ name: '', email: '', description: '' })
        setToast({ message: 'Submission sent successfully 🚀', type: 'success', isVisible: true })
      } else {
        throw new Error(data.error || 'Something went wrong')
      }
    } catch (error) {
      console.error('Submission Error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Try again.';
      setToast({ message: errorMessage, type: 'error', isVisible: true })
    } finally {
      setLoading(false)
    }
  }

  const handleAddLink = () => {
    setIsLinkModalOpen(true)
  }

  const handleLinkSubmit = () => {
    if (linkInput.trim()) {
      setForm(f => ({
        ...f,
        description: f.description 
          ? `${f.description}\n${linkInput.trim()}`
          : linkInput.trim()
      }))
      setLinkInput('')
      setIsLinkModalOpen(false)
    }
  }

  const inputClass = (name: string) =>
    `w-full bg-transparent border-b pb-2 pt-2 font-['Inter','Roboto','Open_Sans',sans-serif] font-light text-[16px] md:text-[18px] tracking-[0.01em] outline-none transition-all duration-200 text-[#cccccc] placeholder-[#555] ${
      focused === name || form[name as keyof FormState] !== '' ? 'border-[#f0ede8]' : 'border-[#2a2a2a]'
    }`

  return (
    <div>
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.isVisible} 
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
      />

      {/* Header */}
      <div className="px-5 md:px-12 pt-6 md:pt-24 pb-6 text-center">
       
        <h1 className="discography-heading text-[18vw] sm:text-[14vw] md:text-[120px] leading-[0.85] mb-5 md:mb-8 animate-fade-up delay-100">
          COLLABORATE
        </h1>
        <div className="flex justify-center animate-fade-up delay-200 mb-6">
          <Waveform bars={9} height="h-8 md:h-10"  barClassName="discography-bg"  />
        </div>
        <p className="max-w-2xl mx-auto font-['Inter','Roboto','Open_Sans',sans-serif] font-light text-[16px] md:text-[18px] leading-[1.6] tracking-[0.01em] text-[#cccccc] mb-8 md:mb-12 animate-fade-up delay-100">
          We collaborate with artists who share a commitment to intentional sound. We are open to working with vocalists, lyricists, instrumentalists, and producers whose work reflects clarity, emotion, and originality. To be considered, please submit a curated selection of your work along with a brief introduction. All submissions are reviewed. Selected collaborators will be contacted directly.
        </p>
      </div>

      <div className="max-w-3xl mx-auto w-full">
        {/* Form */}
        <div className="px-5 md:px-12 pb-10 flex flex-col gap-6 md:gap-8">

        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            className={inputClass('name')}
            disabled={loading}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            className={inputClass('email')}
            disabled={loading}
          />
        </div>

        <div className="flex flex-col gap-1.5 pt-4">
          <div className={`${focused === 'description' || form.description !== '' ? 'logo-gradient-border-full' : 'border border-[#2a2a2a]'} !rounded-xl overflow-hidden relative transition-all duration-300`}>
            <div className="bg-[#0a0a0a] rounded-[calc(0.75rem-1px)]">
              <textarea
                rows={4}
                placeholder="Tell us about your work and include links to your best material."
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                onFocus={() => setFocused('description')}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent p-4 pb-12 font-inter font-light text-[16px] md:text-[18px] tracking-[0.01em] leading-[1.6] outline-none transition-all duration-200 text-[#cccccc] placeholder-[#555] resize-none border-none"
                disabled={loading}
              />
              {/* Link Button */}
              <button
                type="button"
                onClick={handleAddLink}
                disabled={loading}
                className={`absolute bottom-3 left-4 p-2 text-[#555] hover:text-white transition-all group flex items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                title="Add a link"
              >
                <svg width="0" height="0" className="absolute">
                  <linearGradient id="linkGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#a0a0a0" />
                  </linearGradient>
                </svg>
                <MdOutlineLink 
                  className="w-5 h-5 transition-all group-hover:scale-110" 
                  style={{ fill: 'currentColor' }}
                  onMouseEnter={(e) => (e.currentTarget.style.fill = 'url(#linkGradient)')}
                  onMouseLeave={(e) => (e.currentTarget.style.fill = 'currentColor')}
                />
  
              </button>
            </div>
          </div>
        </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading || !form.name || !form.email || !form.description}
            className={`w-full font-['Inter','Roboto','Open_Sans',sans-serif] font-semibold uppercase text-[12px] md:text-[14px] tracking-[0.2em] py-5 md:py-6 transition-all duration-200 relative overflow-hidden ${
              form.name && form.email && form.description
                ? loading
                  ? 'bg-[#2a2a2a] text-[#888] cursor-wait'
                  : 'bg-[#f0ede8] text-[#0a0a0a] hover:opacity-85 active:scale-[0.99]'
                : 'bg-[#1a1a1a] text-[#444] cursor-not-allowed border border-[#2a2a2a]'
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              {loading && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-[#888] border-t-transparent rounded-full"
                />
              )}
              <span>{loading ? 'SUBMITTING...' : 'Submit Your Work'}</span>
            </div>
          </button>
        </div>
      </div>

      <Footer />

      {/* Custom Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsLinkModalOpen(false)}
          ></div>
          
          <div className="relative w-full max-w-[400px] logo-gradient-container rounded-[22px] shadow-2xl animate-fade-up">
            <div className="bg-[#0a0a0a] rounded-[21px] p-8 flex flex-col items-center">
              <span className="cranktasy-header text-[32px] mb-2  -rotate-[4deg]">CrankTasy</span>
              <p className="font-inter text-[12px] text-[#666] uppercase gradient-heading-bebas tracking-[0.2em] mb-6">Share Your Sound</p>
              
              <input
                type="text"
                placeholder="Add a link to your Sound (Drive, SoundCloud, etc.)"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLinkSubmit()}
                className="w-full bg-[#111] border placeholder:text-gray-500 border-[#2a2a2a] rounded-xl p-4 text-[#f0ede8] outline-none focus:border-[#f3a8e2]/50 transition-colors mb-6 font-light"
              />
              
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setIsLinkModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-[#2a2a2a] text-[#888] hover:bg-[#111] transition-all uppercase text-[11px] tracking-widest"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLinkSubmit}
                  className="flex-1 py-3 rounded-xl bg-[#f0ede8] text-black font-bold hover:opacity-85 transition-all uppercase text-[11px] tracking-widest"
                >
                  Add Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {submitted && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setSubmitted(false)}
          ></div>
          
          <div className="relative w-full max-w-[400px] logo-gradient-container rounded-[22px] shadow-2xl animate-fade-up">
            <div className="bg-[#0a0a0a] rounded-[21px] p-8 flex flex-col items-center">
              <span className="cranktasy-header text-[32px] mb-4 -rotate-[4deg]">CrankTasy</span>
              <h3 className="discography-heading text-[24px] md:text-[28px] text-center mb-8 leading-tight">
                YOUR WORK HAS BEEN SUBMITTED
              </h3>
              
              <button
                onClick={() => setSubmitted(false)}
                className="w-full py-3 rounded-xl bg-[#f0ede8] text-black font-bold hover:opacity-85 transition-all uppercase text-[11px] tracking-widest"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
