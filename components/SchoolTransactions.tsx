"use client"
import React, { useState } from "react"
import { Input, Table } from "antd"
import type { TableColumnsType, TableProps } from "antd"
import { BiSearch } from "react-icons/bi"
import { FaBitcoin } from "react-icons/fa"
import { Donation } from "@/utils/declarations/backend/backend.did"

const toFilterArray = (data: Donation[], key: string) => {
  const hashmap: Record<string, { text: string; value: string }> = {}
  data.forEach((entry, index) => {
    hashmap[entry[key as "donater"]] = {
      text: entry[key as "donater"],
      value: entry[key as "donater"],
    }
  })
  return Object.values(hashmap)
}

export const SchoolTransactions = ({ schoolTxn }: { schoolTxn: Donation[] }) => {
  const [dataSource, setDataSource] = useState(schoolTxn)
  const [value, setValue] = useState("")

  const columns: TableColumnsType<Donation> = [
    {
      title: "Tx ID",
      dataIndex: "transaction_id",
    },
    {
      title: "School Name",
      dataIndex: "recipientId",
      filters: toFilterArray(schoolTxn, "recipientId"),
      // onFilter: (value: any, record) => record.school_name.indexOf(value) > -1,
      // filterSearch: true,
    },
    {
      title: (
        <p className="flex gap-2 items-center">
          <FaBitcoin className="text-yellow" /> <span>Amount Donated</span>
        </p>
      ),
      dataIndex: "amount",
      sorter: (a, b) => Number(a.amount) - Number(b.amount),
    },
    {
      title: (
        <p className="flex gap-2 items-center">
          <FaBitcoin className="text-yellow" /> <span>CD&D</span>
        </p>
      ),
      dataIndex: "category",
      sorter: (a, b) =>
        Number(a.category.cdd) -
        Number(b.category.cdd),
    },
    {
      title: (
        <p className="flex gap-2 items-center">
          <FaBitcoin className="text-yellow" /> <span>TS</span>
        </p>
      ),
      dataIndex: "category",
      sorter: (a, b) => Number(a.category.ts) - Number(b.category.ts),
    },
    {
      title: (
        <p className="flex gap-2 items-center">
          <FaBitcoin className="text-yellow" /> <span>SS</span>
        </p>
      ),
      dataIndex: "category",
      sorter: (a, b) => Number(a.category.ss) - Number(b.category.ss),
    },
    {
      title: (
        <p className="flex gap-2 items-center">
          <FaBitcoin className="text-yellow" /> <span>L&S</span>
        </p>
      ),
      dataIndex: "category",
      sorter: (a, b) => Number(a.category.ls) - Number(b.category.ls),
    },
    {
      title: "Donor",
      dataIndex: "donater",
      filters: toFilterArray(schoolTxn, "donater"),
      onFilter: (value: any, record) => record.donater.indexOf(value) > -1,
      filterSearch: true,
    },
  ]
  return (
    <div>
      <div className="flex items-end flex-col justify-end mb-4">
        <p className="font-[600]">Abbreviations</p>
        <ul className="text-sm text-end">
          <li>
            <strong>CD&D</strong> - Curriculum Design and Development
          </li>
          <li>
            <strong>TS</strong> - Teacher Support
          </li>
          <li>
            <strong>SS</strong> - School Support
          </li>
          <li>
            <strong>L&S</strong> - Lunch and Snacks
          </li>
        </ul>
      </div>
      <p className="mb-2">Search Donations with Transaction ID</p>
      <Input
        placeholder="Transaction ID"
        prefix={<BiSearch />}
        size="large"
        className="mb-4 md:w-1/3 w-full"
        value={value}
        onChange={(e) => {
          const currValue = e.target.value
          setValue(currValue)
          const filteredData = schoolTxn.filter((entry) =>
            entry.dti.toLowerCase().includes(currValue.toLowerCase())
          )
          setDataSource(filteredData)
        }}
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        className="overflow-x-auto"
      />
    </div>
  )
}
