"use client"
import React, { useState } from "react"
import { Input, Table } from "antd"
import type { TableColumnsType, TableProps } from "antd"
import { BiSearch } from "react-icons/bi"
import { FaBitcoin } from "react-icons/fa"

interface DataType {
  transaction_id: string
  school_name: string
  amount_donated: number
  curriculum_design_and_development: number
  teacher_support: number
  school_support: number
  lunch_and_snacks: number
  donor: string
}

const data: DataType[] = [
  {
    transaction_id: "001",
    school_name: "ABC School",
    amount_donated: 5000,
    curriculum_design_and_development: 2000,
    teacher_support: 1000,
    school_support: 1500,
    lunch_and_snacks: 500,
    donor: "John Doe",
  },
  {
    transaction_id: "002",
    school_name: "XYZ School",
    amount_donated: 7000,
    curriculum_design_and_development: 3000,
    teacher_support: 2000,
    school_support: 1000,
    lunch_and_snacks: 1000,
    donor: "Jane Smith",
  },
  {
    transaction_id: "003",
    school_name: "123 School",
    amount_donated: 10000,
    curriculum_design_and_development: 4000,
    teacher_support: 3000,
    school_support: 2000,
    lunch_and_snacks: 1000,
    donor: "David Johnson",
  },
  {
    transaction_id: "004",
    school_name: "123 School",
    amount_donated: 10000,
    curriculum_design_and_development: 4000,
    teacher_support: 3000,
    school_support: 2000,
    lunch_and_snacks: 1000,
    donor: "David Johnson",
  },
]

const toFilterArray = (data: DataType[], key: string) => {
  const hashmap: Record<string, { text: string; value: string }> = {}
  data.forEach((entry, index) => {
    hashmap[entry[key as "donor"]] = {
      text: entry[key as "donor"],
      value: entry[key as "donor"],
    }
  })
  return Object.values(hashmap)
}

export const SchoolTransactions: React.FC = () => {
  const [dataSource, setDataSource] = useState(data)
  const [value, setValue] = useState("")

  const columns: TableColumnsType<DataType> = [
    {
      title: "Tx ID",
      dataIndex: "transaction_id",
    },
    {
      title: "School Name",
      dataIndex: "school_name",
      filters: toFilterArray(data, "school_name"),
      onFilter: (value: string, record) =>
        record.school_name.indexOf(value) > -1,
      filterSearch: true,
    },
    {
      title: (
        <p className="flex gap-2 items-center">
          <FaBitcoin className="text-yellow" /> <span>Amount Donated</span>
        </p>
      ),
      dataIndex: "amount_donated",
      sorter: (a, b) => a.amount_donated - b.amount_donated,
    },
    {
      title: (
        <p className="flex gap-2 items-center">
          <FaBitcoin className="text-yellow" /> <span>CD&D</span>
        </p>
      ),
      dataIndex: "amount_donated",
      sorter: (a, b) =>
        a.curriculum_design_and_development -
        b.curriculum_design_and_development,
    },
    {
      title: (
        <p className="flex gap-2 items-center">
          <FaBitcoin className="text-yellow" /> <span>TS</span>
        </p>
      ),
      dataIndex: "amount_donated",
      sorter: (a, b) => a.teacher_support - b.teacher_support,
    },
    {
      title: (
        <p className="flex gap-2 items-center">
          <FaBitcoin className="text-yellow" /> <span>SS</span>
        </p>
      ),
      dataIndex: "amount_donated",
      sorter: (a, b) => a.school_support - b.school_support,
    },
    {
      title: (
        <p className="flex gap-2 items-center">
          <FaBitcoin className="text-yellow" /> <span>L&S</span>
        </p>
      ),
      dataIndex: "amount_donated",
      sorter: (a, b) => a.lunch_and_snacks - b.lunch_and_snacks,
    },
    {
      title: "Donor",
      dataIndex: "donor",
      filters: toFilterArray(data, "donor"),
      onFilter: (value: string, record) => record.donor.indexOf(value) > -1,
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
          const filteredData = data.filter((entry) =>
            entry.transaction_id.toLowerCase().includes(currValue.toLowerCase())
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
