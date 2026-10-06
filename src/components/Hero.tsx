import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const ease = [0.16, 1, 0.3, 1] as const

const VIDEO_SRC =
  'https://media.base44.com/videos/public/6ac41561c3df90e33a7954dd/3c1c8c932_PixVerse_V6_Fusion_720P_image1__image2__image3.mp4'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)
  const ticking = useRef(false)
  const failed = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let duration = 0

    const onLoadedMetadata = () => {
      duration = video.duration
      if (reducedMotion) {
        // Static frame — no scroll scrubbing for reduced motion users
        video.pause()
        try {
          video.currentTime = 0.001
        } catch {
          /* seek before data is ready; first frame shows once decoded */
        }
      }
    }
    video.addEventListener('loadedmetadata', onLoadedMetadata)

    // rAF-throttled scroll mapping: scroll progress -> video.currentTime
    const update = () => {
      ticking.current = false
      const rect = container.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const progress = Math.min(1, Math.max(0, -rect.top / (scrollable || 1)))

      if (!reducedMotion && duration > 0 && !failed.current) {
        // progress * duration, clamped to the closest valid seekable time
        let target = progress * duration
        try {
          if (video.seekable.length > 0) {
            target = Math.min(target, video.seekable.end(video.seekable.length - 1))
          }
        } catch {
          /* seekable ranges unavailable — fall through to duration clamp */
        }
        target = Math.min(target, Math.max(0, duration - 0.05))
        // Only seek when the change is meaningful to avoid seek-queue thrash
        if (Math.abs(video.currentTime - target) > 0.03) {
          try {
            video.currentTime = target
          } catch {
            /* metadata not ready / seek rejected — next rAF retries */
          }
        }
      }

      // Gentle content fade near the end of the hero scroll range
      if (fadeRef.current) {
        const fade = 1 - Math.min(1, Math.max(0, (progress - 0.65) / 0.35))
        fadeRef.current.style.opacity = fade.toFixed(3)
      }
    }

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
    }
  }, [])

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-espresso">
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
          onError={() => {
            // Video unavailable — keep the layout and espresso fallback background
            failed.current = true
          }}
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
  )
}
