"use client"
import React, { useState } from "react"
import { Descriptions, Modal, Popover } from "antd"
import type { DescriptionsProps } from "antd"

const items: DescriptionsProps["items"] = [
  {
    label: "Product",
    children: "Cloud Database",
  },
  {
    label: "Billing",
    children: "Prepaid",
  },
  {
    label: "Time",
    children: "18:00:00",
  },
  {
    label: "Amount",
    children: "$80.00",
  },
  {
    label: "Discount",
    span: { xl: 2, xxl: 2 },
    children: "$20.00",
  },
  {
    label: "Official",
    span: { xl: 2, xxl: 2 },
    children: "$60.00",
  },
  {
    label: "Config Info",
    span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
      </>
    ),
  },
  {
    label: "Hardware Info",
    span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    children: (
      <>
        CPU: 6 Core 3.5 GHz
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
      </>
    ),
  },
]

export const TransactionPreview: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [open, setOpen] = useState(false)
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
