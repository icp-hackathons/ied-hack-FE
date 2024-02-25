"use client"
import { Button, Divider, Input, Popover } from "antd"
import React, { useState } from "react"
import { FaBitcoin } from "react-icons/fa"
import { QRCode } from "./QRCode"
import {
  Category,
  DonationParams,
} from "@/utils/declarations/backend/backend.did"
import Image from "next/legacy/image"
import { DonationPopover } from "./DonationPopover"
interface props {
  id: bigint
  name: string
  level: string
  cgpa: string
  image: string
  about: string
  address: string
}

export const StudentCardAlt = ({ ...props }: props) => {
  const [open, setOpen] = useState(false)
  const [donation, setDonation] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState<number>(0)
  const [openQRCodePaymentTour, setOpenQRCodePaymentTour] = useState(false)

  const getDonationInputs = (txId: string, address: string) => {
    const category: Category = {
      ls: BigInt(0),
      ss: BigInt(0),
      ts: BigInt(0),
      cdd: BigInt(0),
      categoryType: BigInt(0),
    }
    const satoshi = 100000000

    const data: DonationParams = {
      donationTo: BigInt(1),
      txId: txId,
      donater: address,
      donationCategory: category,
      amount: BigInt(donation * satoshi),
      recipientId: props.id,
      paymentMethod: BigInt(paymentMethod),
    }
    return data
  }

  return (
    <div className="students_slide relative overflow-hidden">
      <Image
        src={props.image}
        layout="fill"
        alt={props.name}
        objectFit="cover"
      />
      <div className="absolute bottom-0 left-0 w-full min-h-[40%] bg-white students_slide-details md:translate-y-[110%] px-4 py-3">
        <div className="text-grey-900">
          <p className="text-lg font-bold">{props.name}</p>
          <div className="mb-4 mt-2">
            <div className="text-sm text-gray-500 font-[500] flex gap-2 items-center">
              <div className="h-1 w-1 bg-primary rounded-[100%]"></div>
              <span>{props.level}</span>
            </div>
            <div className="text-sm text-gray-500 font-[500] flex gap-2 items-center">
              <div className="h-1 w-1 bg-green-light rounded-[100%]"></div>
              <span>CGPA: {props.cgpa} / 5.0</span>
            </div>

            <p className="text-sm text-gray-500">{props.about}</p>
          </div>
          <Popover
            trigger={"click"}
            placement="top"
            open={open}
            onOpenChange={() => {
              setOpen(!open)
            }}
            content={
              <div className="min-w-[20rem] relative">
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
                  <span className="bg-grey-800 px-3 py-1 rounded-md border-[1px] border-grey-700 inline-flex items-center gap-1">
                    <FaBitcoin className="text-yellow" />{" "}
                    <span>{donation.toPrecision(9)}</span>
                  </span>
                </p>
                <DonationPopover
                  openQRCodePaymentTour={openQRCodePaymentTour}
                  setOpenQRCodePaymentTour={setOpenQRCodePaymentTour}
                  donation={donation}
                  address={props.address}
                  getDonationInputs={getDonationInputs}
                  disabled={donation <= 0}
                />
              </div>
            }
          >
            <Button
              type="primary"
              className="mt-3 bg-primary w-full flex gap-2 items-center"
              size="large"
            >
              <FaBitcoin />
              <span>Donate</span>
            </Button>
          </Popover>
        </div>
      </div>
    </div>
  )
}
