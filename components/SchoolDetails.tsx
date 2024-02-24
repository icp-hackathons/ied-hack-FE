"use client"
import { SchoolOutput } from "@/src/declarations/backend/backend.did"
import { Drawer } from "antd"
import React from "react"
import { Footer } from "./Footer"
import { Header } from "./new_landingpage/Header"
import { Announcement } from "./new_landingpage/Announcement"
import { Students } from "./Students"

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
        <Header />
        <Students school={school} />
      </div>
      <Footer />
    </Drawer>
  )
}
