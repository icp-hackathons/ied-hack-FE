"use client"
import { Footer } from "@/components/Footer"
import { Schools } from "@/components/Landing/Schools"
import { Announcement } from "@/components/new_landingpage/Announcement"
import { Header } from "@/components/new_landingpage/Header"
import React from "react"

const SchoolsPage = () => {
  return (
    <div className="bg-[#0B090A] text-white overflow-hidden min-h-[100vh]">
      <Announcement />
      <Header />
      <Schools />
      <Footer />
    </div>
  )
}

export default SchoolsPage
