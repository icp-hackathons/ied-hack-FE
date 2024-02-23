"use client"
import React, { useState } from "react"
import Image from "next/image"
import { SchoolPage } from "@/app/School"
import { SchoolOutput } from "@/utils/declarations/backend/backend.did"
import { CiLocationOn } from "react-icons/ci"
import { FaBitcoin } from "react-icons/fa"

interface props {
  school: SchoolOutput
  address: string
  index: number
}

export const SchoolCardAlt: React.FC<props> = ({ school, index, address }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="bg-grey-700 px-5 py-3 rounded-md flex gap-5 justify-between items-center h-[70px]">
        <div className="flex gap-5 items-center md:w-[90%] w-[75%]">
          <p>{index + 1}.</p>
          <div className="relative w-[50px] h-[50px]">
            <Image
              src={school.images[0]}
              fill
              alt="school image"
              className="object-cover rounded-sm"
            />
          </div>
          <p className="md:w-[15%]">{school.name}</p>
          <p className="w-[20%] md:flex items-center gap-2 hidden">
            <CiLocationOn className="text-green-light" /> {school.location}
          </p>
          <p className=" hidden md:block w-[15%]">
            {school.donations.length} Donation(s)
          </p>
          <p className="hidden md:flex gap-3 items-center w-[20%]">
            <div className="flex gap-1 items-center">
              <span>{Number(school.amountDonated).toPrecision(9)}</span>
              <FaBitcoin className="text-yellow" />
            </div>
            <span>Donated</span>
          </p>
        </div>
        <div>
          <p
            className="text-primary cursor-pointer md:text-md text-sm"
            onClick={() => setOpen(true)}
          >
            View School
          </p>
        </div>
      </div>
      <SchoolPage
        open={open}
        setOpen={setOpen}
        school={school}
        address={address}
      />
    </>
  )
}
