"use client"
import { Footer } from "@/components/Footer"
import { SchoolTransactions } from "@/components/SchoolTransactions"
import { Breadcrumb, Tabs, TabsProps } from "antd"
import Image from "next/legacy/image"
import React, { useCallback, useEffect, useState } from "react"
import { BiHomeAlt } from "react-icons/bi"
import { FaWpexplorer } from "react-icons/fa"
import { StudentsTransactions } from "@/components/StudentTransactions"
import { Donation } from "@/utils/declarations/backend/backend.did"
import { getAllDonations } from "@/utils/backend-service"
import Link from "next/link"
import { truncateAddress } from "@/utils/formatter"
import { Announcement } from "@/components/new_landingpage/Announcement"
import { Header } from "@/components/new_landingpage/Header"

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

export default function TxExplorerPage() {
  const [open, setOpen] = useState(false)
  const [studentTransactions, setStudentTransactions] = useState<
    Donation[] | null
  >(null)
  const [schoolTransactions, setSchoolTransactions] = useState<
    Donation[] | null
  >(null)

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Schools Donations Tx",
      children: (
        <SchoolTransactions
          schoolTxn={schoolTransactions ? schoolTransactions : []}
        />
      ),
    },
    {
      key: "2",
      label: "Students Donations Tx",
      children: (
        <StudentsTransactions
          studentTxn={studentTransactions ? studentTransactions : []}
        />
      ),
    },
  ]

  const getDonation = useCallback(async () => {
    const donations = await getAllDonations()

    if (donations.length > 0) {
      const studentTxns = donations.filter((obj) => {
        return obj.donationTo === BigInt(1)
      })

      const schoolTxns = donations.filter((obj) => {
        return obj.donationTo === BigInt(0)
      })

      setStudentTransactions(studentTxns)
      setSchoolTransactions(schoolTxns)
    } else {
      setStudentTransactions([])
      setSchoolTransactions([])
    }
  }, [])

  useEffect(() => {
    if (!studentTransactions && !schoolTransactions) {
      getDonation()
    }
  }, [studentTransactions, schoolTransactions, getDonation])

  return (
    <div>
      <div className="bg-[#0B090A] text-white overflow-hidden min-h-[100vh]">
        <Announcement />
        <Header />
        <div className="md:px-[5rem] px-[1.5rem] py-10 min-h-[80vh]">
          <Tabs items={tabItems} defaultActiveKey="1" />
        </div>
        <Footer />
      </div>
    </div>
  )
}

const formatAmount = (amount: bigint, paymentType: bigint) => {
  let formatted_amount = (amount / BigInt(10 ** 8)).toString()
  if (paymentType == BigInt(0)) {
    return <>{formatted_amount} BTC</>
  } else {
    return <>{formatted_amount} ckBTC</>
  }
}
