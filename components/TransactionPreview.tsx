"use client"
import React, { useState } from "react"
import { Descriptions, Popover } from "antd"
import type { DescriptionsProps } from "antd"
import { Donation } from "@/utils/declarations/backend/backend.did"
import { truncateAddress } from "@/utils/formatter"
import Link from "next/link"

const formatAmount = (amount: bigint, paymentType: bigint) => {
  let formatted_amount = (Number(BigInt(amount)) / Number(BigInt(10 ** 8))).toString()
  if (paymentType == BigInt(0)) {
    return <>{formatted_amount} BTC</>
  } else {
    return <>{formatted_amount} ckBTC</>
  }
}

const formatPaymentType = (paymentType: bigint) => {
  if (paymentType == BigInt(0)) {
    return <>BTC</>
  } else {
    return <>ckBTC</>
  }
}

const getTxId = (txId: string, paymentMethod: bigint) => {
  if (paymentMethod == BigInt(0)) {
    return (
      <Link
        href={`https://blockstream.info/testnet/tx/${txId}`}
        className="text-[#957fef] underline"
      >
        {truncateAddress(txId)}
      </Link>
    )
  } else {
    return (
      <Link
        className="text-[#957fef] underline"
        href={`https://dashboard.internetcomputer.org/bitcoin/transaction/${txId}`}
      >
        {truncateAddress(txId)}
      </Link>
    )
  }
}

const getAccountId = (addr: string, paymentMethod: bigint) => {
  if (paymentMethod == BigInt(0)) {
    return (
      <Link
        href={`https://blockstream.info/testnet/address/${addr}`}
        className="text-[#957fef] underline"
      >
        {truncateAddress(addr)}
      </Link>
    )
  } else {
    return (
      <Link
        className="text-[#957fef] underline"
        href={`https://dashboard.internetcomputer.org/bitcoin/account/${addr}`}
      >
        {truncateAddress(addr)}
      </Link>
    )
  }
}

const getItems = (donation: Donation, donationTo: Number) => {
  if (donationTo === 0) {
    const items: DescriptionsProps["items"] = [
      {
        label: "DTI",
        span: { xl: 2, xxl: 2 },
        children: donation.dti,
      },
      {
        label: "Donater",
        span: { xl: 2, xxl: 2 },
        children: getAccountId(donation.donater, donation.paymentMethod),
      },
      {
        label: "TX ID",
        span: { xl: 2, xxl: 2 },
        children: getTxId(donation.txId, donation.paymentMethod),
      },
      {
        label: "Status",
        children: donation.confirmed ? "Confirmed" : "Awaiting Confirmation",
      },
      {
        label: "Payment Method",
        children: formatPaymentType(donation.paymentMethod),
      },
      {
        label: "Amount",
        children: formatAmount(donation.amount, donation.paymentMethod),
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
    return items
  } else {
    const items: DescriptionsProps["items"] = [
      {
        label: "DTI",
        span: { xl: 2, xxl: 2 },
        children: donation.dti,
      },
      {
        label: "Donater",
        span: { xl: 2, xxl: 2 },
        children: getAccountId(donation.donater, donation.paymentMethod),
      },
      {
        label: "TX ID",
        span: { xl: 2, xxl: 2 },
        children: getTxId(donation.txId, donation.paymentMethod),
      },
      {
        label: "Status",
        children: donation.confirmed ? "Confirmed" : "Awaiting Confirmation",
      },
      {
        label: "Payment Method",
        children: formatPaymentType(donation.paymentMethod),
      },
      {
        label: "Amount",
        children: formatAmount(donation.amount, donation.paymentMethod),
      }
    ]
    return items
  }
}

export const TransactionPreview: React.FC<{
  donation: Donation
  children: React.ReactNode
  donationTo: Number
}> = ({ children, donation, donationTo }) => {
  const [open, setOpen] = useState(false)
  const items: DescriptionsProps["items"] = getItems(donation, donationTo)
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
