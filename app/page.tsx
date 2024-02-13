"use client"
import { Footer } from "@/components/Footer"
import { Counter } from "@/components/Landing/Counter"
import { Left } from "@/components/Landing/Left"
import { Right } from "@/components/Landing/Right"
import { Schools } from "@/components/Landing/Schools"
import React from "react"

export default function Home() {
  const [counter, setCounter] = React.useState(0)
  return (
    <main className="relative">
      {/* {counter < 100 ? (
        <Counter counter={counter} setCounter={setCounter} />
      ) : (
        <>
          <div className="flex lg:min-h-[100vh] flex-col-reverse md:flex-row bg-green">
            <Left />
            <Right />
          </div>
        </>
      )} */}
      <Counter counter={counter} setCounter={setCounter} />
      <div className="relative z-[100]">
        <div className="flex lg:min-h-[100vh] flex-col-reverse md:flex-row bg-green">
          <Left />
          <Right />
        </div>
        <Schools />
        <Footer />
      </div>
    </main>
  )
}
