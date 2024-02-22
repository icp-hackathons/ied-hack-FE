"use client"
import React from "react"
import { GiSupersonicArrow } from "react-icons/gi"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const images = [
  {
    src: "https://images.unsplash.com/photo-1566204773863-cf63e6d4ab88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1345&q=100",
    title: "Dracaena Trifasciata",
    subtitle: "Live the Beauty",
    category: "Shooting / Adv.Campaing",
  },
  {
    src: "https://images.unsplash.com/photo-1558603668-6570496b66f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=100",
    title: "Cereus Penuvianus",
    subtitle: "Live the Beauty",
    category: "Shooting / Adv.Campaing",
  },
  {
    src: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=100",
    title: "Calliope",
    subtitle: "Live the Beauty",
    category: "Shooting / Adv.Campaing",
  },
  {
    src: "https://images.unsplash.com/photo-1611145367651-6303b46e4040?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2006&q=100",
    title: "Golden Pothos",
    subtitle: "Living Room",
    category: "Shooting / Adv.Campaing",
  },
]

const bgColors = ["#000", "#000"]

export const Showcase = () => {
  const bgColorElement = document.querySelector(".bg-color")
  const imgRef = React.useRef(null)
  function updateBackground(color: string) {
    gsap.to(bgColorElement, {
      background: `linear-gradient(0deg, ${color} 0%, rgba(252, 176, 69, 0) 100%)`,
      duration: 2,
      ease: "power1.out",
    })
  }
  useGSAP(() => {
    gsap.utils.toArray(".item").forEach((item: any, index) => {
      const img = item.querySelector(".item-img img")

      gsap.fromTo(
        img,
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          ease: "power1.out",
          duration: 2,
          scrollTrigger: {
            trigger: item,
            start: "center bottom",
            end: "bottom top",
            toggleActions: "play none none none",
            onEnter: () => updateBackground(bgColors[index]),
            onEnterBack: () => updateBackground(bgColors[index]),
          },
        }
      )

      document.addEventListener("DOMContentLoaded", () => {
        const counterElemeent = document.querySelector(".counter p") as Element
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight

        function updateScrollPercentage() {
          const scrollPosition = window.scrollY
          const scroolledPercentage = Math.round(
            (scrollPosition / docHeight) * 100
          )
          counterElemeent.textContent = `${scroolledPercentage}`
        }

        window.addEventListener("scroll", updateScrollPercentage)
      })
    })
  })
  return (
    <div className="relative z-[100] mt-[9rem] px-10">
      <h2 className="text-center text-2xl cursor-pointer bg-transparent">
        <GiSupersonicArrow className="inline text-glow text-red-500 bg-transparent" />
      </h2>
      <div className="mt-10 items">
        {images.map((image, index) => (
          <div key={index} className="relative mb-5 item">
            <div className="item-img">
              <img
                src={image.src}
                alt={image.title}
                className="w-[80%] mx-auto h-[600px] object-cover"
              />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20" />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="text-white text-center">
                <h2 className="text-3xl font-bold">{image.title}</h2>
                <p className="text-lg">{image.subtitle}</p>
                <p className="text-sm">{image.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
