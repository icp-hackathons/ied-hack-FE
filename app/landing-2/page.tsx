"use client"
import { Counter } from "@/components/Landing/Counter"
import { Announcement } from "@/components/new_landingpage/Announcement"
import { Hero } from "@/components/new_landingpage/Hero"
import React from "react"
import { Showcase } from "./Showcase"
import { Footer } from "@/components/Footer"

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
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default LandingPage
