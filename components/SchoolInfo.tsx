"use client"
import React, { useState } from "react"
import { SchoolOutput } from "@/src/declarations/backend/backend.did"
import Image from "next/image"
import { BiArrowBack } from "react-icons/bi"
import { CiLocationOn } from "react-icons/ci"
import { FaBitcoin } from "react-icons/fa"
import { Donate } from "@/app/Donate"
import { Image as AntImage, Button } from "antd"
import { BiSolidDonateHeart } from "react-icons/bi"
import { BsQrCode } from "react-icons/bs"
import { DonateToSchool } from "./DonateToSchool"

export const SchoolInfo = ({
  open,
  setOpen,
  school,
  address,
  showStudents,
  setShowStudents,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  school: SchoolOutput
  address: string
  showStudents: boolean
  setShowStudents: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [openDonate, setOpenDonate] = useState(false)
  return (
    <div className="min-h-[100vh] relative">
      <div
        className="inline-flex gap-3 items-center md:px-[5rem] px-[1.5rem] md:py-10 py-5 cursor-pointer text-primary"
        onClick={() => setOpen(false)}
      >
        <BiArrowBack />
        <span>Go back</span>
      </div>
      <div className="flex justify-between md:flex-row flex-col mt-[1rem] md:mx-[5rem] mx-[1.5rem]">
        <div className="pb-10 flex flex-col justify-between md:min-h-[33rem] border-b-[1px] border-b-grey-700 md:w-[50%]">
          <div>
            <p className=" font-bold capitalize flex gap-2 items-center text-md">
              <CiLocationOn className="text-green-light text-md" />
              <span className="text-grey-200">{school.location}</span>
            </p>
            <h2 className="md:text-[7rem] text-[3rem] special-text md:-mt-5">
              {school.name}
            </h2>
            <p className="text-grey-200 md:text-[16px]">{school.description}</p>

            <div className="flex gap-[5rem] mt-5 md:mb-0 mb-7">
              <div>
                <p className="font-bold text-grey-400 uppercase">Donations</p>
                <p className="font-bold">{school.donations.length} Donations</p>
              </div>
              <div>
                <p className="font-bold text-grey-400 uppercase">
                  Amount donated
                </p>
                <p className="font-bold flex gap-1 items-center">
                  <FaBitcoin className="text-yellow" />
                  <span>
                    {Number(school.amountDonated).toPrecision(9)} Donated
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-[1rem]">
            <Button
              size="large"
              className="border-primary md:w-auto w-full"
              onClick={() => setShowStudents(true)}
            >
              View Students
            </Button>
            <Button
              size="large"
              type="primary"
              className="bg-primary flex items-center md:w-auto w-full justify-center"
              icon={<FaBitcoin />}
              onClick={() => setOpenDonate(true)}
            >
              Donate
            </Button>
          </div>
        </div>
        <div className="relative w-[45%] h-[33rem] md:block hidden">
          <Image
            fill
            src={school.images[0]}
            alt={school.name}
            className="object-cover"
          />
          {/* <Donate school={school} address={address} /> */}
        </div>
      </div>
      <div className="py-10 md:px-[5rem] px-[1.5rem]">
        <h2 className="md:text-[2rem] text-[1.5rem] font-semibold text-grey-100">
          {school.name} Galley
        </h2>
        <p className="md:text-[16px] text-grey-200">
          Check out images from the prestigous school.
        </p>
        <div className="my-5">
          <AntImage.PreviewGroup
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`),
            }}
          >
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4 min-w-full">
              {school.images.map((image, index) => {
                return (
                  <div key={index} className="md:h-[500px] h-[300px]">
                    <AntImage
                      src={image}
                      alt="IED Hack"
                      style={{ objectFit: "cover", borderRadius: "5px" }}
                      height={"100%"}
                      width={"100%"}
                    />
                  </div>
                )
              })}
            </div>
          </AntImage.PreviewGroup>
        </div>
      </div>
      <DonateToSchool
        open={openDonate}
        setOpen={setOpenDonate}
        school={school}
        address={address}
      />
    </div>
  )
}
