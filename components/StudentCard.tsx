"use client"
import { Button, Divider, Image, Input, Popover } from "antd"
import React, { useState } from "react"
import { FaBitcoin } from "react-icons/fa"

interface props {
  name: string
  level: string
  cgpa: string
  image: string
  about: string
}

export const StudentCard = ({ ...props }: props) => {
  const [open, setOpen] = useState(false)
  const [donation, setDonation] = useState(0)
  return (
    <div className="w-full shadow-lg rounded-[20px]">
      <div className="z-[5] relative">
        <Image
          src={props.image}
          width={"100%"}
          height={"15rem"}
          alt="School Student"
          style={{
            objectFit: "cover",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
          }}
        />
      </div>
      <div className="bg-white p-3 rounded-[20px] mt-[-30px] z-[10] relative">
        <p className="text-lg font-bold">{props.name}</p>
        <div className="mb-4 mt-2">
          <p className="text-sm text-gray-500 font-[500] flex gap-2 items-center">
            <div className="h-1 w-1 bg-yellow rounded-[100%]"></div>
            <span>{props.level}</span>
          </p>
          <p className="text-sm text-gray-500 font-[500] flex gap-2 items-center">
            <div className="h-1 w-1 bg-green-light rounded-[100%]"></div>
            <span>CGPA: {props.cgpa} / 5.0</span>
          </p>

          <p className="text-sm text-gray-500">{props.about}</p>
        </div>
        <Popover
          trigger={"click"}
          open={open}
          onOpenChange={() => setOpen(!open)}
          content={
            <div className="min-w-[20rem]">
              <Input
                size="large"
                placeholder="Input amount to donate"
                type="number"
                className="w-full"
                onChange={(e) => setDonation(Number(e.target.value))}
              />
              <Divider>Summary</Divider>
              <p className="flex justify-between items-center">
                <span>Amount</span>
                <span>{donation.toPrecision(9)}</span>
              </p>
              <Button
                type="primary"
                className="mt-3 bg-green-light w-full flex gap-2 items-center justify-center"
                size="large"
              >
                <FaBitcoin />
                <span>Make donation</span>
              </Button>
            </div>
          }
        >
          <Button
            type="primary"
            className="mt-3 bg-green-light w-full flex gap-2 items-center"
            size="large"
          >
            <FaBitcoin />
            <span>Donate</span>
          </Button>
        </Popover>
      </div>
    </div>
  )
}
