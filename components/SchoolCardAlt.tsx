"use client"
import React, { useState } from "react"
import Image from "next/image"
import { SchoolOutput } from "@/utils/declarations/backend/backend.did"
import { CiLocationOn } from "react-icons/ci"
import { FaBitcoin } from "react-icons/fa"
import { SchoolDetails } from "./SchoolDetails"
import { Button } from "antd"

interface props {
  school: SchoolOutput
  address: string
  index: number
  ckaddress: string
}

export const SchoolCardAlt: React.FC<props> = ({ school, index, address, ckaddress }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="bg-grey-700 md:px-5 px-3 py-3 rounded-md flex gap-5 justify-between items-center h-[70px]">
        <div className="flex md:gap-5 gap-3 items-center md:w-[90%] w-[70%]">
          <p>{index + 1}.</p>
          <div className="relative md:w-[50px] w-[40px] md:h-[50px] h-[40px]">
            <Image
              src={school.images[0]}
              fill
              alt="school image"
              className="object-cover rounded-sm"
            />
          </div>
          <p className="md:w-[15%] md:text-[16px] text-sm">{school.name}</p>
          <p className="w-[20%] md:flex items-center gap-2 hidden">
            <CiLocationOn className="text-green-light" /> {school.location}
          </p>
          <p className=" hidden md:block w-[15%]">
            {school.donations.length} Donation(s)
          </p>
          <div className="hidden md:flex gap-3 items-center w-[20%]">
            <div className="flex gap-1 items-center">
              <span> {Number(BigInt(school.amountDonated)) / Number(BigInt(10 ** 8))} Donated</span>
              <FaBitcoin className="text-yellow" />
            </div>
            <span>Donated</span>
          </div>
        </div>
        <div>
          <Button
            size="middle"
            className="text-primary border-primary border-[1px] cursor-pointer md:text-md text-sm"
            onClick={() => setOpen(true)}
          >
            View School
          </Button>
        </div>
      </div>
      <SchoolDetails
        open={open}
        setOpen={setOpen}
        school={school}
        address={address}
        ckaddress={ckaddress}
      />
    </>
  )
}
