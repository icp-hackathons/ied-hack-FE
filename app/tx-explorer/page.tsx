"use client"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { SchoolTransactions } from "@/components/SchoolTransactions"
import { Breadcrumb, Tabs, TabsProps } from "antd"
import Image from "next/image"
import React from "react"
import { BiHomeAlt } from "react-icons/bi"
import { FaWpexplorer } from "react-icons/fa"
import { StudentsTransactions } from "@/components/StudentTransactions"

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
        <FaWpexplorer />
        <span>Tx Explorer</span>
      </div>
    ),
  },
]

const tabItems: TabsProps["items"] = [
  {
    key: "1",
    label: "Schools Donations Tx",
    children: <SchoolTransactions />,
  },
  {
    key: "2",
    label: "Students Donations Tx",
    children: <StudentsTransactions />,
  },
]

export default function TxExplorerPage() {
  return (
    <div>
      <div className="bg-[#cfcfcf67] md:m-2 md:p-[2rem] p-[1rem] md:rounded-md urbanist min-h-[98vh] relative overflow-hidden">
        <div className="absolute left-1/2 top-0 -ml-[39rem] w-[113.125rem] max-w-none h-[40rem] z-[-1]">
          <Image fill alt="beams" src={"/beams-basic.png"} />
        </div>
        <Header />
        <Breadcrumb items={items} className="my-[2rem]" />
        <div>
          <Tabs items={tabItems} defaultActiveKey="1" />
        </div>
      </div>

      <Footer />
    </div>
  )
}
