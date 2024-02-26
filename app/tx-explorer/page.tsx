"use client"
import { Footer } from "@/components/Footer"
import { Empty, Tabs, TabsProps } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import { Donation } from "@/utils/declarations/backend/backend.did"
import { getAllDonations, getPendingDonations } from "@/utils/backend-service"
import { Announcement } from "@/components/new_landingpage/Announcement"
import { Header } from "@/components/new_landingpage/Header"
import Image from "next/image"
import { Icons } from "@/components/Icon"
import { Transactions } from "@/components/Transactions"
import { StudentTransactions } from "@/components/StudentTransactions"

export default function TxExplorerPage() {
  const [studentTransactions, setStudentTransactions] = useState<
    Donation[] | null
  >(null)
  const [schoolTransactions, setSchoolTransactions] = useState<
    Donation[] | null
  >(null)
  const [pendingTransactions, setPendingTransactions] = useState<Donation[] | null
  >(null)
  const [gettingTxns, setGettingTxns] = useState(false)

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Schools Donations Tx",
      children: (
        <Transactions
          Txn={schoolTransactions ? schoolTransactions : []}
        />
      ),
    },
    {
      key: "2",
      label: "Students Donations Tx",
      children: (
        <StudentTransactions
          Txn={studentTransactions ? studentTransactions : []}
        />
      ),
    },
    {
      key: "3",
      label: <Icons.Pending width={20} height={20} />,
      children: (
        <Transactions
          Txn={pendingTransactions ? pendingTransactions : []}
        />
      ),
    },
  ]

  const getDonation = useCallback(async () => {
    setGettingTxns(true)
    const donations = await getAllDonations()
    const pendingDonations = await getPendingDonations()
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

    if (pendingDonations.length > 0) {
      setPendingTransactions(pendingDonations)
    } else {
      setPendingTransactions([])
    }

    setGettingTxns(false)
  }, [])

  useEffect(() => {
    if (!studentTransactions && !schoolTransactions && !pendingTransactions) {
      getDonation()
    }
  }, [studentTransactions, schoolTransactions, pendingTransactions, getDonation])

  return (
    <div>
      <div className="bg-[#0B090A] text-white overflow-hidden min-h-[100vh]">
        <Announcement />
        <Header />
        <div className="md:px-[5rem] px-[1.5rem] py-10 min-h-[80vh]">
          {gettingTxns ? (
            <p>Loading Txns....</p>
          ) : (<>
            {
              (
                (schoolTransactions ? schoolTransactions.length > 0 : [].length > 0) ||
                (studentTransactions ? studentTransactions.length > 0 : [].length > 0) ||
                (pendingTransactions ? pendingTransactions.length > 0 : [].length > 0)
              ) ? (
                <Tabs items={tabItems} defaultActiveKey="1" />
              ) :
                (
                  <div className="mb-[8rem]">
                    <Empty
                      description={false}
                      image={
                        <div className="flex justify-center items-center flex-col gap-1">
                          <div className="h-[200px] w-[200px] relative">
                            <Image src={"/not-found.png"} alt="Empty" fill />
                          </div>
                          <p>No Txn Found</p>
                        </div>
                      }
                    />
                  </div>
                )
            }
          </>)}
        </div>
        <Footer />
      </div>
    </div>
  )
}