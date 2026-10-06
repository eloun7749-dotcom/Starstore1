import { useEffect, useRef } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const VIDEO_SRC =
  'https://media.base44.com/videos/public/6ac41561c3df90e33a7954dd/3c1c8c932_PixVerse_V6_Fusion_720P_image1__image2__image3.mp4'

const seg = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)))
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const video = videoRef.current
    if (!hero || !video) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let rafId: number | null = null
    let failed = false

    // Reduced motion: stable readable composition — no scroll-driven typography movement
    if (reducedMotion) {
      if (brandRef.current) brandRef.current.style.opacity = '0'
      if (scrollHintRef.current) scrollHintRef.current.style.opacity = '0'
      if (headRef.current) {
        headRef.current.style.opacity = '1'
        headRef.current.style.transform = 'none'
        headRef.current.style.filter = 'none'
      }
      if (subRef.current) {
        subRef.current.style.opacity = '1'
        subRef.current.style.transform = 'none'
      }
      if (ctaRef.current) {
        ctaRef.current.style.opacity = '0.95'
        ctaRef.current.style.transform = 'none'
      }
    }

    // scroll position -> normalized progress -> video.duration -> video.currentTime
    const updateVideo = () => {
      rafId = null

      const scrollableDistance = hero.offsetHeight - window.innerHeight
      if (scrollableDistance <= 0) return

      const rect = hero.getBoundingClientRect()
      const p = clamp01(-rect.top / scrollableDistance)

      // Cinematic typography choreography (GPU-friendly: transform / opacity / filter only)
      if (!reducedMotion) {
        // STAR STORE — subtle blur-in, holds, then recedes as the product takes over
        if (brandRef.current) {
          const b = brandRef.current
          const inR = seg(p, 0, 0.18)
          const outR = seg(p, 0.3, 0.6)
          b.style.opacity = ((0.25 + 0.75 * inR) * (1 - outR)).toFixed(3)
          b.style.transform = `translate3d(0, ${((1 - inR) * 14 - outR * 18).toFixed(1)}px, 0) scale(${(0.955 + 0.045 * inR - 0.012 * outR).toFixed(4)})`
          b.style.filter = `blur(${((1 - inR) * 5 + outR * 4).toFixed(1)}px)`
          b.style.letterSpacing = `${(0.42 + 0.14 * inR).toFixed(3)}em`
        }
        // Persian headline — becomes the message, then gently yields to the product
        if (headRef.current) {
          const h = headRef.current
          const inR = seg(p, 0.15, 0.3)
          const outR = seg(p, 0.5, 0.8)
          h.style.opacity = (inR * (1 - outR)).toFixed(3)
          h.style.transform = `translate3d(0, ${((1 - inR) * 26 - outR * 22).toFixed(1)}px, 0) scale(${(0.985 + 0.015 * inR).toFixed(4)})`
          h.style.filter = `blur(${((1 - inR) * 4 + outR * 4).toFixed(1)}px)`
        }
        // Supporting copy — follows with a smaller offset (depth)
        if (subRef.current) {
          const s = subRef.current
          const inR = seg(p, 0.24, 0.36)
          const outR = seg(p, 0.46, 0.72)
          s.style.opacity = (inR * (1 - outR)).toFixed(3)
          s.style.transform = `translate3d(0, ${((1 - inR) * 18 - outR * 14).toFixed(1)}px, 0)`
          s.style.filter = `blur(${(outR * 3).toFixed(1)}px)`
        }
        // CTA — minimal movement, stays usable through the message stage
        if (ctaRef.current) {
          const c = ctaRef.current
          const inR = seg(p, 0.28, 0.38)
          const outR = seg(p, 0.42, 0.66)
          const o = 0.95 * inR * (1 - outR)
          c.style.opacity = o.toFixed(3)
          c.style.transform = `translate3d(0, ${((1 - inR) * 10 - outR * 8).toFixed(1)}px, 0)`
          c.style.pointerEvents = o < 0.15 ? 'none' : 'auto'
        }
        // Scroll hint — visible at the start, gone once the story is underway
        if (scrollHintRef.current) {
          const s = scrollHintRef.current
          s.style.opacity = (1 - seg(p, 0, 0.12)).toFixed(3)
          s.style.transform = `translate3d(0, ${(p * 10).toFixed(1)}px, 0)`
        }
      }

      // Duration is read live every frame (never cached), so there is no
      // dependency on having caught the loadedmetadata event.
      const duration = video.duration
      if (failed || !Number.isFinite(duration) || duration <= 0) return

      // Final frame: stay a hair inside the end so the last frame is shown
      const targetTime = Math.min(p * duration, duration - 0.001)

      if (Math.abs(video.currentTime - targetTime) > 0.01) {
        try {
          video.currentTime = targetTime
        } catch (error) {
          console.warn('Unable to seek hero video', error)
        }
      }
    }

    const requestVideoUpdate = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(updateVideo)
    }

    const handleMetadata = () => {
      // Metadata is ready: park on frame 0, then sync to wherever the page is scrolled
      try {
        video.currentTime = 0
      } catch {
        /* ignore — next update retries */
      }
      requestVideoUpdate()
    }
    const handleError = () => {
      // Video unavailable — keep the layout on the espresso fallback background
      failed = true
    }

    video.addEventListener('loadedmetadata', handleMetadata)
    video.addEventListener('loadeddata', requestVideoUpdate)
    video.addEventListener('canplay', requestVideoUpdate)
    video.addEventListener('error', handleError)
    window.addEventListener('scroll', requestVideoUpdate, { passive: true })
    window.addEventListener('resize', requestVideoUpdate)

    // Metadata may already be here (cached video / remount): don't wait for an event that has fired
    if (video.readyState >= 1) handleMetadata()
    else requestVideoUpdate()

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      video.removeEventListener('loadedmetadata', handleMetadata)
      video.removeEventListener('loadeddata', requestVideoUpdate)
      video.removeEventListener('canplay', requestVideoUpdate)
      video.removeEventListener('error', handleError)
      window.removeEventListener('scroll', requestVideoUpdate)
      window.removeEventListener('resize', requestVideoUpdate)
    }
  }, [])

  return (
    <section id="hero" ref={heroRef} className="relative h-[230vh] bg-espresso">
      {/* Sticky video viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          autoPlay={false}
          loop={false}
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        />

        {/* Localized readability gradient behind the text column only — product stays clear */}
        <div className="absolute inset-y-0 right-0 w-[78%] md:w-[55%] bg-gradient-to-l from-espresso/80 via-espresso/35 to-transparent" />

        {/* Header blend — lets the fixed nav dissolve into the scene instead of cutting it */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-espresso/55 via-espresso/20 to-transparent" />

        {/* Very subtle cinematic vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 180px rgba(23,16,11,0.45)' }} />

        {/* STAR STORE — cinematic title sequence */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div
            ref={brandRef}
            className="font-display text-cream uppercase whitespace-nowrap select-none font-light text-[11vw] md:text-7xl lg:text-8xl"
            style={{ opacity: 0.25, filter: 'blur(5px)', transform: 'translate3d(0,14px,0) scale(0.955)', letterSpacing: '0.42em' }}
          >
            STAR&nbsp;STORE
          </div>
        </div>

        {/* Persian hero content — lower third, RTL, right aligned */}
        <div className="absolute inset-x-0 bottom-[8%] z-10" dir="rtl">
          <div className="section-pad">
            <div className="max-w-[1600px] mx-auto flex justify-start">
              <div className="max-w-xl">
                <p className="font-hero-fa meta-label tracking-normal text-sage-green mb-6">
                  قهوه‌ای بهتر / روزهایی روشن‌تر
                </p>
                <h1
                  ref={headRef}
                  style={{ opacity: 0 }}
                  className="font-hero-fa text-4xl md:text-6xl font-light text-cream leading-[1.5]"
                >
                  صبح‌های خوب
                  <br />
                  عجله‌ای
                  <br />
                  برای شروع ندارند.
                </h1>
                <p
                  ref={subRef}
                  style={{ opacity: 0 }}
                  className="font-hero-fa text-base md:text-lg text-cream/75 mt-6 leading-loose"
                >
                  قهوه‌ای با دقت انتخاب‌شده،
                  <br />
                  برای روزهایی که ارزش آرام‌تر زندگی کردن را دارند.
                </p>
                <div ref={ctaRef} style={{ opacity: 0 }} className="mt-8">
                  <Link to="/shop" className="btn-primary group">
                    مشاهده قهوه‌ها
                    <ArrowLeft size={16} className="transition-transform duration-500 group-hover:-translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint — state driven by hero progress, not a looping animation */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10">
          <div ref={scrollHintRef} className="flex flex-col items-center gap-2">
            <span className="meta-label text-cream/60 text-[10px]">SCROLL</span>
            <div className="w-px h-12 bg-cream/40" />
          </div>
        </div>
      </div>
    </section>
  )
}
