"use client"
import { Counter } from "@/components/Landing/Counter"
import { Announcement } from "@/components/new_landingpage/Announcement"
import { Header } from "@/components/new_landingpage/Header"
import { Hero } from "@/components/new_landingpage/Hero"
import React from "react"

const LandingPage = () => {
  const [counter, setCounter] = React.useState(0)

  return (
    <div className="relative">
      <Counter counter={counter} setCounter={setCounter} />

      <div className="bg-[#0B090A] min-h-[100vh] text-white overflow-x-hidden">
        <Announcement />
        <Hero />
      </div>
    </div>
  )
}

export default LandingPage
