import { Announcement } from "@/components/new_landingpage/Announcement"
import { Header } from "@/components/new_landingpage/Header"
import { Hero } from "@/components/new_landingpage/Hero"
import React from "react"

const LandingPage = () => {
  return (
    <div className="bg-[#0B090A] min-h-[100vh] text-white overflow-x-hidden">
      <Announcement />
      <Hero />
    </div>
  )
}

export default LandingPage
