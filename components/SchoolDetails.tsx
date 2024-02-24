"use client"
import { SchoolOutput } from "@/src/declarations/backend/backend.did"
import { Drawer } from "antd"
import React from "react"
import { Footer } from "./Footer"
import { Header } from "./new_landingpage/Header"
import { Announcement } from "./new_landingpage/Announcement"
import { Students } from "./Students"
import { BiArrowBack } from "react-icons/bi"

export const SchoolDetails = ({
  open,
  setOpen,
  school,
  address,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  school: SchoolOutput
  address: string
}) => {
  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      width={"100%"}
      closable={false}
      styles={{ body: { padding: 0 } }}
    >
      <div className="bg-[#0B090A] text-white md:rounded-md min-h-[95vh] relative overflow-hidden">
        <Announcement />
        <Header setOpen={setOpen} />

        {/* <div
          className="flex gap-3 items-center p-3 cursor-pointer relative z-[50]"
          onClick={() => setOpen(false)}
        >
          <BiArrowBack /> <span>Go Back</span>
        </div> */}
        <Students school={school} address={address} open={open} />
      </div>
      <Footer />
    </Drawer>
  )
}
