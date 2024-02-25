"use client"
import React, { useState } from "react"
import { Descriptions, Modal, Popover } from "antd"
import type { DescriptionsProps } from "antd"
import { Donation } from "@/utils/declarations/backend/backend.did"

const formatAmount = (amount: bigint, paymentType: bigint) => {
  let formatted_amount = (amount / BigInt(10 ** 8)).toString()
  if (paymentType == BigInt(0)) {
    return <>{formatted_amount} BTC</>
  } else {
    return <>{formatted_amount} ckBTC</>
  }
}

export const TransactionPreview: React.FC<{
  donation: Donation
  children: React.ReactNode
}> = ({ children, donation }) => {
  const [open, setOpen] = useState(false)
  const items: DescriptionsProps["items"] = [
    {
      label: "DTI",
      span: { xl: 2, xxl: 2 },
      children: donation.dti,
    },
    {
      label: "Donater",
      span: { xl: 2, xxl: 2 },
      children: donation.donater,
    },
    {
      label: "TX ID",
      span: { xl: 2, xxl: 2 },
      children: donation.txId,
    },
    {
      label: "Status",
      children: donation.confirmed ? "Success" : "Pending",
    },
    {
      label: "Payment Method",
      children: String(donation.paymentMethod),
    },
    {
      label: "Amount",
      children: formatAmount(donation.amount, donation.paymentMethod),
    },

    {
      label: "TX ID",
      span: { xl: 2, xxl: 2 },
      children: donation.txId,
    },

    {
      label: "Category",
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
      children: (
        <>
          <p>
            Curriculum design and development:{" "}
            {formatAmount(donation.category.cdd, donation.paymentMethod)}
          </p>
          <p>
            Teacher support:{" "}
            {formatAmount(donation.category.ts, donation.paymentMethod)}
          </p>
          <p>
            School supplies:{" "}
            {formatAmount(donation.category.ss, donation.paymentMethod)}
          </p>
          <p>
            Learning support:{" "}
            {formatAmount(donation.category.ls, donation.paymentMethod)}
          </p>
        </>
      ),
    },
  ]
  return (
    <>
      <Popover
        trigger={["click"]}
        open={open}
        onOpenChange={() => setOpen((open) => !open)}
        placement="left"
        content={
          <Descriptions
            title="Transaction Preview"
            bordered
            column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
            items={items}
          />
        }
      >
        {children}
      </Popover>
    </>
  )
}
