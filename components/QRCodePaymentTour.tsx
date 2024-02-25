"use client"
import React, { useRef, useState } from "react"
import { Button, Tour } from "antd"
import type { TourProps } from "antd"
import { QRCode } from "./QRCode"
import { MdVerified } from "react-icons/md"
import { VerifyDonation } from "./VerifyDonation"

interface props {
  children: React.ReactNode
  donation: number | string
  address: string
  getDonationInputs: Function
}

export const QRCodePaymentTour: React.FC<props> = ({
  children,
  donation,
  address,
  getDonationInputs,
}) => {
  const ref = useRef(null)
  const [openQRCodePaymentTour, setOpenQRCodePaymentTour] = useState(false)

  const steps: TourProps["steps"] = [
    {
      title: "QR Code and Address",
      description: (
        <QRCode
          amount={donation as any}
          address={address}
          placement="bottom"
          getDonationInputs={getDonationInputs}
        ></QRCode>
      ),
      target: null,
      nextButtonProps: {
        children: (
          <div className="flex gap-1 items-center">
            <MdVerified className="text-green-light text-xl" />
            <span>Verify Donation</span>
          </div>
        ),
        className: "h-[2rem]",
      },
    },
    {
      title: "Verify Donation",
      description: <VerifyDonation getDonationInputs={getDonationInputs} />,
      target: null,
      nextButtonProps: {
        className: "h-[2rem]",
      },
      prevButtonProps: {
        className: "h-[2rem]",
      },
    },
  ]

  return (
    <>
      <Button
        type="primary"
        className="bg-primary w-full"
        size="large"
        onClick={() => setOpenQRCodePaymentTour(true)}
        ref={ref}
      >
        {children}
      </Button>

      <Tour
        open={openQRCodePaymentTour}
        onClose={() => setOpenQRCodePaymentTour(false)}
        steps={steps}
      />
    </>
  )
}
