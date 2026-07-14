import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function PageMotion({ children, variant }) {
  const root = useRef(null)

  useGSAP(
    (context, contextSafe) => {
      const desktop = window.matchMedia('(min-width: 761px)').matches
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduceMotion) {
        gsap.set('.motion-hero, .motion-hero-media, .motion-reveal', { clearProps: 'all' })
        gsap.set('.motion-progress', { scaleX: 1 })
        return undefined
      }

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .from('.motion-hero', {
          autoAlpha: 0,
          y: 28,
          duration: 0.8,
          stagger: 0.09,
        })
        .from(
          '.motion-hero-media',
          {
            autoAlpha: 0,
            y: 42,
            rotation: desktop ? 1.5 : 0,
            scale: 0.98,
            duration: 1,
          },
          0.16,
        )

      gsap.set('.motion-reveal', { autoAlpha: 0, y: 34 })

      ScrollTrigger.batch('.motion-reveal', {
        start: 'top 86%',
        once: true,
        interval: 0.08,
        batchMax: desktop ? 4 : 2,
        onEnter: contextSafe((batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: 'power3.out',
            stagger: 0.08,
            overwrite: true,
          })

          const productShots = batch.flatMap((element) => (
            Array.from(element.querySelectorAll?.('.project-card__media-shot') || [])
          ))
          if (productShots.length) {
            gsap.fromTo(
              productShots,
              { autoAlpha: 0, y: 18 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.58,
                ease: 'power3.out',
                stagger: 0.07,
                overwrite: true,
              },
            )
          }
        }),
      })

      if (desktop && variant === 'case') {
        const mediaImage = root.current?.querySelector('.case-hero__media img')
        if (mediaImage) {
          gsap.fromTo(
            mediaImage,
            { yPercent: -2, scale: 1.045 },
            {
              yPercent: 5,
              scale: 1.045,
              ease: 'none',
              scrollTrigger: {
                trigger: '.case-hero__media',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            },
          )
        }
      }

      if (variant === 'case') {
        gsap.fromTo(
          '.motion-progress',
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.25,
            },
          },
        )
      }

      if (desktop && variant === 'home') {
        gsap.to('.hero__visual', {
          y: -54,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.9,
          },
        })
      }

      const refresh = () => ScrollTrigger.refresh()
      window.addEventListener('load', refresh, { once: true })
      const pendingImages = Array.from(root.current?.querySelectorAll('img') || [])
        .filter((image) => !image.complete)
      pendingImages.forEach((image) => image.addEventListener('load', refresh, { once: true }))

      return () => {
        window.removeEventListener('load', refresh)
        pendingImages.forEach((image) => image.removeEventListener('load', refresh))
      }
    },
    { scope: root, dependencies: [variant], revertOnUpdate: true },
  )

  return (
    <div className="page-motion" ref={root}>
      {variant === 'case' && <span className="motion-progress" aria-hidden="true" />}
      {children}
    </div>
  )
}
