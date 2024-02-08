"use client"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { SchoolTransactions } from "@/components/SchoolTransactions"
import { Breadcrumb, Tabs, TabsProps } from "antd"
import Image from "next/legacy/image"
import React, { useCallback, useEffect, useState } from "react"
import { BiHomeAlt } from "react-icons/bi"
import { FaWpexplorer } from "react-icons/fa"
import { StudentsTransactions } from "@/components/StudentTransactions"
import { Donation } from "@/utils/declarations/backend/backend.did"
import { getAllDonations } from "@/utils/backend-service"

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
  const [open, setOpen] = useState(false);
  const [studentTransactions, setStudentTransactions] = useState<Donation[] | null>(null);
  const [schoolTransactions, setSchoolTransactions] = useState<Donation[] | null>([]);

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Schools Donations Tx",
      children: <SchoolTransactions schoolTxn={schoolTransactions ? schoolTransactions : []} />,
    },
    {
      key: "2",
      label: "Students Donations Tx",
      children: <StudentsTransactions studentTxn={studentTransactions ? studentTransactions : []} />,
    },
  ]


  const getDonation = useCallback(async () => {
    const donations = await getAllDonations();

    if (donations.length > 0) {
      const studentTxns = donations.filter(obj => {
        return obj.donationTo === BigInt(1);
      });

      const schoolTxns = donations.filter(obj => {
        return obj.donationTo === BigInt(0);
      });

      setStudentTransactions(studentTxns);
      setSchoolTransactions(schoolTxns);
    } else {
      setStudentTransactions([]);
      setSchoolTransactions([]);
    }
  }, [])

  useEffect(() => {
    if (!studentTransactions && !schoolTransactions) {
      getDonation();
    }
  }, [studentTransactions, schoolTransactions, getDonation])

  return (
    <div>
      <div className="bg-[#cfcfcf67] md:m-2 md:p-[2rem] p-[1rem] md:rounded-md urbanist min-h-[98vh] relative overflow-hidden">
        <div className="absolute left-1/2 top-0 -ml-[39rem] w-[113.125rem] max-w-none h-[40rem] z-[-1]">
          <Image layout="fill" alt="beams" src={"/beams-basic.png"} />
        </div>
        <Header setOpen={setOpen} />
        <Breadcrumb items={items} className="my-[2rem]" />
        <div>
          <Tabs items={tabItems} defaultActiveKey="1" />
        </div>
      </div>

      <Footer />
    </div>
  )
}
