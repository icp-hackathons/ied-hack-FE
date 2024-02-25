"use client"
import { Button, Popover } from "antd"
import React, { useState } from "react"
import { NNSPayment } from "./NNSPayment"
import { QRCodePaymentTour } from "./QRCodePaymentTour"

interface props {
  donation: number | string
  address: string
  getDonationInputs: Function
  disabled: boolean
  ckaddress: string
}

export const DonationPopover: React.FC<props> = ({
  donation,
  address,
  getDonationInputs,
  disabled,
  ckaddress
}) => {
  const [openPopover, setOpenPopover] = useState(false)

  return (
    <Popover
      trigger={"click"}
      onOpenChange={() => {
        setOpenPopover(!openPopover)
      }}
      open={openPopover}
      content={
        <div className="w-full p-5 rounded-md">
          <p className="text-center mb-4 text-[17px]">Payment Methods</p>
          <div className="flex gap-3 w-full bg-grey-700">
            <CkBTCPopover
              donation={donation}
              address={address}
              getDonationInputs={getDonationInputs}
              disabled={disabled}
              ckaddress={ckaddress}
            />
            <QRCodePaymentTour
              donation={donation}
              address={address}
              getDonationInputs={getDonationInputs}
            >
              Pay with BTC
            </QRCodePaymentTour>
          </div>
          <p
            className="text-primary cursor-pointer mt-3"
            onClick={() => setOpenPopover(false)}
          >
            Close
          </p>
        </div>
      }
    >
      <Button
        type="primary"
        className="bg-primary w-full"
        size="large"
        disabled={disabled}
      >
        Proceed
      </Button>
    </Popover>
  )
}

export const CkBTCPopover: React.FC<props> = ({
  donation,
  address,
  getDonationInputs,
  ckaddress,
  disabled,
}) => {
  const [openCkBtcPopover, setOpenCkBtcPopover] = useState(false)

  return (
    <Popover
      trigger={"click"}
      onOpenChange={() => setOpenCkBtcPopover(!openCkBtcPopover)}
      open={openCkBtcPopover}
      arrow
      content={
        <div className="w-full p-5 rounded-md bg-grey-700">
          <p className="text-center mb-4 text-[17px]">ckBTC Payment Methods</p>
          <div className="flex gap-3 w-full">
            <NNSPayment />
            <QRCodePaymentTour
              donation={donation}
              address={ckaddress}
              getDonationInputs={getDonationInputs}
            >
              QR Code
            </QRCodePaymentTour>
          </div>

          <p
            className="text-primary cursor-pointer mt-3"
            onClick={() => setOpenCkBtcPopover(false)}
          >
            Close
          </p>
        </div>
      }
    >
      <Button className="border-primary w-full" size="large">
        Pay with ckBTC
      </Button>
    </Popover>
  )
}
