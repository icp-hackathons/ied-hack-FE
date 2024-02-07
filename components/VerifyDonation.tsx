"use client"
import { Divider, Input, Popover } from "antd"
import React, { useState } from "react"

export const VerifyDonation = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Popover
        open={open}
        trigger={"click"}
        onOpenChange={() => setOpen(!open)}
        placement="topRight"
        content={
          <div className="min-w-[22rem]">
            <h3 className="text-center text-2xl font-[500]">
              Verify your donation
            </h3>
            <Divider>Use the transaction ID to verify your donation.</Divider>
            <Input
              size="large"
              placeholder="Transaction ID"
              className="w-full"
            />
            <button className="bg-green-light px-3 py-2 rounded-md text-white w-full mt-3">
              Continue
            </button>
          </div>
        }
      >
        {children}
      </Popover>
    </>
  )
}
