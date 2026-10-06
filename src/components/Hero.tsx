import { useEffect, useRef } from 'react'
import { motion, MotionConfig } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const ease = [0.16, 1, 0.3, 1] as const

const VIDEO_SRC =
  'https://media.base44.com/videos/public/6ac41561c3df90e33a7954dd/3c1c8c932_PixVerse_V6_Fusion_720P_image1__image2__image3.mp4'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const video = videoRef.current
    if (!hero || !video) return

    let rafId: number | null = null
    let failed = false

    // scroll position -> normalized progress -> video.duration -> video.currentTime
    const updateVideo = () => {
      rafId = null

      const scrollableDistance = hero.offsetHeight - window.innerHeight
      if (scrollableDistance <= 0) return

      const rect = hero.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance))

      // Gentle content fade near the end of the hero scroll range
      if (fadeRef.current) {
        const fade = 1 - Math.min(1, Math.max(0, (progress - 0.65) / 0.35))
        fadeRef.current.style.opacity = fade.toFixed(3)
      }

      // Duration is read live every frame (never cached), so there is no
      // dependency on having caught the loadedmetadata event.
      const duration = video.duration
      if (failed || !Number.isFinite(duration) || duration <= 0) return

      // Final frame: stay a hair inside the end so the last frame is shown
      const targetTime = Math.min(progress * duration, duration - 0.001)

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
    <MotionConfig reducedMotion="user">
      <section ref={heroRef} className="relative h-[300vh] bg-espresso">
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
          <div className="absolute inset-y-0 left-0 w-[70%] md:w-[52%] bg-gradient-to-r from-espresso/75 via-espresso/35 to-transparent" />

          {/* Hero content — same copy, typography and entrance animation as before */}
          <div ref={fadeRef} className="absolute inset-0 z-10">
            <div className="h-full flex items-center section-pad">
              <div className="w-full max-w-[1600px] mx-auto">
                <div className="order-2 lg:order-1">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease }}
                    className="meta-label text-sage-green mb-8"
                  >
                    BETTER COFFEE / BRIGHTER DAYS
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, ease }}
                    className="font-display text-hero text-cream"
                  >
                    Good mornings
                    <br />
                    take their
                    <br />
                    <span className="italic">time.</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9, ease }}
                    className="text-lg text-cream/80 mt-8 max-w-md leading-relaxed"
                  >
                    Thoughtfully sourced coffee for a more human day.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2, ease }}
                    className="mt-10"
                  >
                    <Link to="/shop" className="btn-primary group">
                      Explore our coffee
                      <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          >
            <span className="meta-label text-cream/60 text-[10px]">SCROLL</span>
            <motion.div
              className="w-px h-12 bg-cream/40"
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transformOrigin: 'top' }}
            />
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}
