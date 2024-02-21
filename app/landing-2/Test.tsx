import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)
export const ImageRevealOnScroll = () => {
  const imageRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top bottom-=200", // Adjust start position as needed
        end: "bottom top", // Adjust end position as needed
        scrub: true, // Smoothly transition the animation while scrolling
        markers: false, // Display markers for debugging
      },
    })

    tl.to(
      imageRef.current,
      // { scale: 1.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1 }
    )
  }, [])

  return (
    <div className="relative mt-[17rem]">
      <h1>Image Reveal On Scroll</h1>
      <div ref={imageRef} className="overflow-hidden img-animate">
        <img
          src="/landing2.jpg"
          alt="Reveal Image"
          style={{
            width: "30rem",
            // height: "30rem",
            display: "block",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  )
}
