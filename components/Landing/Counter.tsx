"use client"
import React, { useEffect } from "react"

interface CounterProps {
  counter: number
  setCounter: React.Dispatch<React.SetStateAction<number>>
}

export const Counter = ({ counter, setCounter }: CounterProps) => {
  // useEffect(() => {
  //   const startLoader = () => {
  //     const updateCounter = () => {
  //       let counterValue = counter
  //       setCounter((prev) => {
  //         if (prev === 100) {
  //           return prev
  //         }
  //         prev += Math.floor(Math.random() * 10) + 1
  //         if (prev > 100) {
  //           prev = 100
  //         }
  //         return prev
  //       })
  //       let delay = Math.floor(Math.random() * 200) + 200
  //       setTimeout(updateCounter, delay)
  //       console.log("hey")
  //     }
  //     updateCounter()
  //   }
  //   startLoader()
  // }, [])
  return (
    <div className="fixed h-[100vh] w-[100vw] top-0 left-0 bg-grey-800 z-[150] text-grey-200">
      <h2 className="absolute bottom-5 right-10 alegreya text-[7rem]">
        {counter}
      </h2>
    </div>
  )
}
