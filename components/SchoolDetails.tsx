"use client"
import { SchoolOutput } from "@/src/declarations/backend/backend.did"
import { Drawer } from "antd"
import React from "react"
import { Footer } from "./Footer"
import { Header } from "./new_landingpage/Header"
import { Announcement } from "./new_landingpage/Announcement"
import { Students } from "./Students"
import { SchoolInfo } from "./SchoolInfo"

export const SchoolDetails = ({
  open,
  setOpen,
  school,
  address,
  ckaddress
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  school: SchoolOutput
  address: string
  ckaddress: string
}) => {
  const [showStudents, setShowStudents] = React.useState(false)
  return (
    <>
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
          <SchoolInfo
            school={school}
            address={address}
            ckaddress={ckaddress}
            open={open}
            setOpen={setOpen}
            {...{ showStudents, setShowStudents }}
          />
        </div>
        <Footer />
      </Drawer>
      <Drawer
        open={showStudents}
        onClose={() => setShowStudents(false)}
        width={"100%"}
        height={"100%"}
        closable={false}
        styles={{ body: { padding: 0 } }}
        placement="top"
      >
        <div className="relative overflow-hidden bg-[#0B090A] text-white">
          <Students
            school={school}
            address={address}
            ckaddress={ckaddress}
            open={open}
            {...{ showStudents, setShowStudents }}
          />
        </div>
      </Drawer>
    </>
  )
}
