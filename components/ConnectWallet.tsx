"use client"
import React from "react"
import { BsWallet2 } from "react-icons/bs"

export const ConnectWallet = () => {
  return (
    <button className="bg-grey-700 text-grey-50 px-[16px] py-[10px] rounded-md flex items-center gap-3">
      <BsWallet2 className="inline" />
      <span>Connect wallet</span>
    </button>
  )
}
