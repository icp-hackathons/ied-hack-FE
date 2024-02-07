"use client"
import React, { useState } from "react"
import Image from "next/legacy/image"
import { SchoolPage } from "@/app/School"
import { SchoolOutput } from "@/utils/declarations/backend/backend.did"

interface props {
  school: SchoolOutput;
}

export const SchoolCard: React.FC<props> = ({ ...props }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="p-[0.7rem] h-[450px] w-full rounded-[14px] border-[1px] border-grey-200 bg-white flex-initial no-scrollbar text-white">
        <div className="relative w-full h-full">
          <div className="bg-[#0A0A0A33] backdrop-blur-[20px] p-[10px] rounded-[20px] absolute top-[18px] right-[18px] z-10">
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
          <div className="backdrop-blur-[20px] p-[16px] md:p-[16px] mt-[-2rem] rounded-b-[14px] bg-[#0A0A0A33] card-shadow absolute bottom-0 left-0 min-h-[124px] z-1 w-full">
            <div className="flex flex-col justify-between gap-[1.5rem] ">
              <p className="uppercase alegreya">{props.school.name}</p>
              <button
                className="bg-green px-7 py-3 hover:text-grey-700 card-btn relative overflow-hidden"
                onClick={() => setOpen(true)}
              >
                <div className="relative z-[10] text-center">View School</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <SchoolPage open={open} setOpen={setOpen} school={props.school} />
    </>
  )
}
