"use client"
import React, { useState } from "react"
import { Input, Table } from "antd"
import type { TableColumnsType, TableProps } from "antd"
import { BiSearch } from "react-icons/bi"
import { FaBitcoin } from "react-icons/fa"

interface DataType {
  transaction_id: string
  student_name: string
  amount_donated: number
  donor: string
}

const data: DataType[] = [
  {
    transaction_id: "001",
    student_name: "ABC",
    amount_donated: 5000,
    donor: "ytacsjdfjsyeadfdf",
  },
  {
    transaction_id: "002",
    student_name: "XYZ",
    amount_donated: 7000,
    donor: "ztacsssdfjsyeasda",
  },
  {
    transaction_id: "003",
    student_name: "123",
    amount_donated: 10000,
    donor: "bdhcsjdfjsyeamra",
  },
  {
    transaction_id: "004",
    student_name: "123",
    amount_donated: 10000,
    donor: "agjksjdfjsyeadlk",
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

export const StudentsTransactions: React.FC = () => {
  const [dataSource, setDataSource] = useState(data)
  const [value, setValue] = useState("")

  const columns: TableColumnsType<DataType> = [
    {
      title: "Tx ID",
      dataIndex: "transaction_id",
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
      filters: toFilterArray(data, "student_name"),
      onFilter: (value: any, record) => record.student_name.indexOf(value) > -1,
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
      title: "Donor",
      dataIndex: "donor",
      filters: toFilterArray(data, "donor"),
      onFilter: (value: any, record) => record.donor.indexOf(value) > -1,
      filterSearch: true,
    },
  ]
  return (
    <div>
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
