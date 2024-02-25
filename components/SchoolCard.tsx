"use client"
import React, { useState } from "react"
import Image from "next/legacy/image"
import { SchoolOutput } from "@/utils/declarations/backend/backend.did"
import { SchoolDetails } from "./SchoolDetails"

interface props {
  school: SchoolOutput
  address: string
}

export const SchoolCard: React.FC<props> = ({ ...props }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="p-[0.7rem] h-[450px] w-full rounded-[10px] border-[1px] border-grey-700 bg-grey-800 flex-initial no-scrollbar text-white">
        <div className="relative w-full h-full">
          <div className="bg-[#0A0A0A33] backdrop-blur-[20px] p-[10px] rounded-[20px] absolute top-[18px] right-[18px] z-10 font-semibold">
            {props.school.donations.length} donations
          </div>
          <Image
            src={(props.school.images as any[])[0]}
            layout="fill"
            alt={props.school.name}
            className="rounded-[10px]"
            objectFit="cover"
          />
        </div>
        <div className="relative">
          <div className="backdrop-blur-[20px] p-[16px] md:p-[16px] mt-[-2rem] rounded-b-[10px] bg-[#0A0A0A33] card-shadow absolute bottom-0 left-0 min-h-[164px] z-1 w-full">
            <div className="flex flex-col justify-between gap-[1.5rem] ">
              <p className="uppercase grotesk font-semibold">
                {props.school.name}
              </p>
              <p className="text-sm">
                {props.school.description.slice(0, 100)}...
              </p>
              <button
                className="bg-primary px-7 py-3 hover:text-grey-700 card-btn relative overflow-hidden"
                onClick={() => setOpen(true)}
              >
                <div className="relative z-[10] text-center">View School</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <SchoolDetails
        open={open}
        setOpen={setOpen}
        school={props.school}
        address={props.address}
      />
    </>
  )
}
