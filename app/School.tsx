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
import * as backend from "@/utils/backend-service"
import { School } from "@/src/declarations/backend/backend.did"
import { useParams } from "next/navigation"
import { Drawer } from "antd"

async function getSchool(id: string): Promise<[] | [School]> {
  const school = await backend.getSchoolById(id)
  return school
}

export function SchoolPage({
  open,
  setOpen,
  id,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  id: string
}) {
  console.log(id)
  const [school, setSchool] = useState<[] | [School]>([])
  const [loading, setLoading] = useState(true)
  //@ts-ignore

  useEffect(() => {
    const getSchool = async (id: string) => {
      setLoading(true)
      const school = await backend.getSchoolById(id)
      setLoading(false)
      setSchool(school)
      return school
    }
    getSchool(id as string)
  })
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
      title: <span>{id}</span>,
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
          <SchoolDetails />
          <Donate />
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Students
            studentArr={school[0]?.students ? school[0].students : []}
          />
        )}
      </div>
      <Footer />
    </Drawer>
  )
}
