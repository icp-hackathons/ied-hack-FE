"use client"
import { Divider } from "antd"
import React, { useState } from "react"
import { CgCheck, CgCopy } from "react-icons/cg"
import { QRCodeSVG } from "qrcode.react"

export const QRCode = ({
  amount,
  address,
  children,
  placement,
  getDonationInputs,
  paymentMethod,
}: {
  amount: number | string
  address: string
  children?: React.ReactNode
  placement?: "top" | "bottom" | "left" | "right"
  getDonationInputs: Function
  paymentMethod: string
}) => {
  const [copied, setCopied] = useState(false)

  const getQR = () => {
    if (paymentMethod == "0") {
      const qrCodeValue = amount ? `bitcoin:${address}?amount=${amount}` : address
      return qrCodeValue
    } else {
      const qrCodeValue = amount
        ? `ckbtc:${address}?amount=${amount}`
        : address;
      return qrCodeValue
    }
  }

  return (
    <>
      <div className="min-w-[20rem] mb-3">
        <h3 className="text-center text-2xl font-[500]">Scan QR code</h3>
        <p className="text-center">
          Scan this code to get the deposit address.
        </p>
        <div className="flex justify-center items-center">
          <QRCodeSVG value={getQR()} height={250} width={250} />
        </div>
        <Divider>or copy the address manually</Divider>
        <div className="flex justify-between items-center gap-2">
          <p className="border-[1px] border-grey-500 p-2 rounded-md w-full">
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
            className="bg-primary px-3 py-2 rounded-md text-white flex items-center gap-2"
          >
            {copied ? <CgCheck className="font-[28px]" /> : <CgCopy />}
            <span>{!copied ? "Copy" : "Copied!"}</span>
          </button>
        </div>
      </div>
    </>
  )
}
