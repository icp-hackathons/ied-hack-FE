"use client"
import React, { useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Overlay } from "./Overlay"

interface CounterProps {
  counter: number
  setCounter: React.Dispatch<React.SetStateAction<number>>
}

export const Counter = ({ counter, setCounter }: CounterProps) => {
  useGSAP(() => {
    const startLoader = () => {
      const updateCounter = () => {
        let counterValue = counter
        setCounter((prev) => {
          if (prev === 100) {
            return prev
          }
          prev += Math.floor(Math.random() * 10) + 1
          if (prev > 100) {
            prev = 100
          }
          return prev
        })
        let delay = Math.floor(Math.random() * 100) + 100
        setTimeout(updateCounter, delay)
        console.log("hey")
      }
      updateCounter()
    }
    startLoader()

    gsap.to(".animation-counter", {
      duration: 0.25,
      delay: 3.5,
      opacity: 0,
      zIndex: -1,
    })
    gsap.to(".animation-bar", {
      duration: 1.5,
      delay: 3.5,
      height: 0,
      zIndex: -1,
      stagger: {
        amount: 0.5,
      },
      ease: "power4.out",
    })

    gsap.to(".animation-overlay", {
      delay: 5,
      zIndex: -1,
    })
  })
  return (
    <div>
      <div className="fixed h-[100vh] w-[100vw] top-0 left-0 bg-grey-800 z-[150] text-grey-200 animation-counter">
        <h2 className="absolute bottom-5 right-10 alegreya md:text-[20rem] text-[5rem]">
          {counter}
        </h2>
      </div>
      <Overlay />
    </div>
  )
}
