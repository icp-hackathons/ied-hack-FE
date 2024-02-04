import Image from "next/image"
import React from "react"

export const Right = () => {
  return (
    <div className="md:w-[75%] bg-green h-full lg:p-[40px] md:p-[24px] p-[1rem] relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.4]">
        <Image src="/patterns.png" alt="IED Hackathon" fill />
      </div>
    </div>
  )
}
