"use client"
import { Counter } from "@/components/Landing/Counter"
import { Announcement } from "@/components/new_landingpage/Announcement"
import { Header } from "@/components/new_landingpage/Header"
import { Hero } from "@/components/new_landingpage/Hero"
import React from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { Showcase } from "./Showcase"
import Gallery from "@/components/Gallary"
import { Footer } from "@/components/Footer"
// import { ImageRevealOnScroll } from "./Test"

const LandingPage = () => {
  const [counter, setCounter] = React.useState(0)

  return (
    <div className="relative">
      <Counter counter={counter} setCounter={setCounter} />

      <div id="smooth-wrapper">
        <div className="bg-[#0B090A] text-white overflow-hidden">
          <Announcement />
          <Hero />
          <Showcase />
          {/* <ImageRevealOnScroll /> */}
          {/* <div className="relative">
            <Gallery />
          </div> */}
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default LandingPage
