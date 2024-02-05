"use client"
import React, { useState } from "react"
import Image from "next/image"

interface props {
  image: string
  schoolName: string
  id?: string
}

export const PortalCard: React.FC<props> = ({ ...props }) => {
  return (
    <div className="p-[1rem] h-[400px] rounded-[24px] border-[1px] border-grey-600 bg-grey-900 flex-initial no-scrollbar">
      <div className="relative w-full h-full">
        <div className="bg-[#0A0A0A33] backdrop-blur-[20px] p-[10px] rounded-[20px] absolute top-[18px] right-[18px] z-10">
          20k donations
        </div>
        <Image
          src={props.image}
          fill
          alt={props.schoolName}
          className="rounded-[14px]"
          objectFit="cover"
        />
      </div>
      <div className="relative">
        <div className="backdrop-blur-[20px] p-[16px] md:p-[16px] mt-[-2rem] rounded-b-[14px] bg-[#0A0A0AA3] card-shadow absolute bottom-0 left-0 min-h-[124px] z-1 w-full">
          <div className="flex flex-col justify-between gap-[1rem] ">
            <p>{props.schoolName}</p>
            <button>Donate Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}
