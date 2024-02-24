"use client"
import React from "react"
import { SchoolOutput } from "@/src/declarations/backend/backend.did"
import Image from "next/image"
import { BiArrowBack } from "react-icons/bi"
import { CiLocationOn } from "react-icons/ci"
import { FaBitcoin } from "react-icons/fa"
import { Donate } from "@/app/Donate"
import { FloatButton, Image as AntImage, Button } from "antd"
import { BiSolidDonateHeart } from "react-icons/bi"
import { BsQrCode } from "react-icons/bs"

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
  return (
    <div className="min-h-[100vh] relative">
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ right: 94 }}
        icon={<BiSolidDonateHeart />}
      >
        <FloatButton icon={<BsQrCode />} />
        <FloatButton icon={<FaBitcoin className="text-yellow" />} />
      </FloatButton.Group>
      <div
        className="inline-flex gap-3 items-center px-[5rem] py-10 cursor-pointer text-primary"
        onClick={() => setOpen(false)}
      >
        <BiArrowBack />
        <span>Go back</span>
      </div>
      <div className="flex justify-between mt-[2rem] ml-[5rem]">
        <div className="pb-10 flex flex-col justify-between md:min-h-[33rem] border-b-[1px] border-b-grey-700 w-[50%]">
          <div>
            <p className=" font-bold capitalize flex gap-2 items-center text-md">
              <CiLocationOn className="text-green-light text-md" />
              <span className="text-grey-200">{school.location}</span>
            </p>
            <h2 className="text-[7rem] special-text -mt-5">{school.name}</h2>
            <p className="text-grey-200 text-[16px]">{school.description}</p>

            <div className="flex gap-[5rem] mt-5">
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
              className="border-primary"
              onClick={() => setShowStudents(true)}
            >
              View Students
            </Button>
            <Button
              size="large"
              type="primary"
              className="bg-primary flex items-center"
              icon={<FaBitcoin />}
            >
              Donate
            </Button>
          </div>
        </div>
        <div className="relative w-[45%] h-[33rem]">
          <Image
            fill
            src={school.images[0]}
            alt={school.name}
            className="object-cover"
          />
          {/* <Donate school={school} address={address} /> */}
        </div>
      </div>
      <div className="py-10 px-[5rem]">
        <h2 className="text-[2rem] font-semibold text-grey-100">
          {school.name} Galley
        </h2>
        <p className="text-[16px] text-grey-200">
          Check out images from the prestigous school.
        </p>
        <div className="my-5">
          <div className="grid grid-cols-3 gap-4">
            {school.images.map((image, index) => (
              <AntImage
                key={index}
                src={image}
                alt={school.name}
                className="object-cover"
                height={500}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
