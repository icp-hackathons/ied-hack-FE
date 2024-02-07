"use client"
import { Header } from "@/components/Header"
import Image from "next/legacy/image"
import React, { useEffect, useState } from "react"
import { Breadcrumb } from "antd"
import { BiHomeAlt } from "react-icons/bi"
import { BiSolidSchool } from "react-icons/bi"
import { SchoolDetails } from "./SchoolDetails"
import { Donate } from "./Donate"
import { Students } from "./Students"
import { Footer } from "@/components/Footer"
import { SchoolOutput } from "@/src/declarations/backend/backend.did"
import { Drawer } from "antd"

export function SchoolPage({
  open,
  setOpen,
  school,
  address,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  school: SchoolOutput
  address: string
}) {
  const items = [
    {
      href: "/",
      title: (
        <div className="inline-flex items-center gap-2">
          <BiHomeAlt className="inline" />
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <BiSolidSchool />
          <span>School</span>
        </div>
      ),
    },
    {
      title: <span>{school.id.toString()}</span>,
    },
  ]
  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      width={"100%"}
      closable={false}
      styles={{ body: { padding: 0 } }}
    >
      <div className="bg-[#cfcfcf67] md:m-2 md:p-[2rem] p-[1rem] md:rounded-md urbanist min-h-[98vh] relative overflow-hidden">
        <div className="absolute left-1/2 top-0 -ml-[39rem] w-[113.125rem] max-w-none h-[40rem] z-[-1]">
          <Image layout="fill" alt="beams" src={"/beams-basic.png"} />
        </div>
        <Header setOpen={setOpen} />
        <Breadcrumb items={items} className="my-[2rem]" />
        <div className="flex justify-between gap-4 md:flex-row flex-col items-start">
          <SchoolDetails school={school} />
          <Donate school={school} address={address} />
        </div>
        <Students
          studentArr={school.students}
          address={address}
        />
      </div>
      <Footer />
    </Drawer>
  )
}
