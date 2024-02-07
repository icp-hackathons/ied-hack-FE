"use client"
import { Divider, Popover } from "antd"
import { Verify } from "crypto"
import Image from "next/legacy/image"
import React, { useState } from "react"
import { CgCheck, CgCopy } from "react-icons/cg"
import { VerifyDonation } from "./VerifyDonation"
import { QRCodeSVG } from "qrcode.react";

export const QRCode = ({
  amount,
  address,
  children,
  placement,
}: {
  amount: number | string
  address: string
  children: React.ReactNode
  placement?: any | "top" | "bottom" | "left" | "right"
}) => {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const qrCodeValue = amount
    ? `bitcoin:${address}?amount=${amount}`
    : address;

  console.log(address);
  return (
    <>
      <Popover
        placement={placement || "top"}
        open={open}
        trigger={"click"}
        onOpenChange={() => setOpen(!open)}
        content={
          <div className="min-w-[20rem]">
            <h3 className="text-center text-2xl font-[500]">Scan QR code</h3>
            <p className="text-center">
              Scan this code to get the deposit address.
            </p>
            <div className="flex justify-center items-center">
              {/* <Image
                src={`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=bitcoin:${address}?amount=${amount}`}
                alt="QR Code"
                width={250}
                height={250}
              /> */}

              <QRCodeSVG value={qrCodeValue} height={250} width={250} />
            </div>
            <Divider>or copy the address manually</Divider>
            <div className="flex justify-between items-center gap-2">
              <p className="border-[1px] border-grey-200 p-2 rounded-md">
                {address}
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(address)
                  setCopied(true)
                  setTimeout(() => {
                    setCopied(false)
                  }, 3000)
                }}
                className="bg-green-light px-3 py-2 rounded-md text-white flex items-center gap-2"
              >
                {copied ? <CgCheck className="font-[28px]" /> : <CgCopy />}
                <span>{!copied ? "Copy" : "Copied!"}</span>
              </button>
            </div>

            <VerifyDonation>
              <button
                className="bg-green-light px-3 py-2 rounded-md text-white w-full mt-3"
                onClick={() => setOpen(false)}
              >
                Verify Donation
              </button>
            </VerifyDonation>
          </div>
        }
      >
        {children}
      </Popover>
    </>
  )
}
