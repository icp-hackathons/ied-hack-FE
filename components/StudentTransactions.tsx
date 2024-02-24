"use client"
import React, { useEffect, useState } from "react"
import { Input, Table } from "antd"
import type { TableColumnsType, TableProps } from "antd"
import { BiSearch } from "react-icons/bi"
import { FaBitcoin } from "react-icons/fa"
import { Donation } from "@/utils/declarations/backend/backend.did"
import { getStudentById } from "@/utils/backend-service"
import { formatAmount, getAccountId, getTxId, truncateAddress } from "@/app/tx-explorer/page"

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

const StudentNameComp = ({ id }: { id: bigint }) => {
  const [name, setName] = useState("")

  useEffect(() => {
    async function fetchData() {
      const res = await getStudentById(id);
      setName(res.name);
    }
    fetchData()
  }, [id]);

  return (
    <>{name}</>
  )
};

export const StudentsTransactions = ({ studentTxn }: { studentTxn: Donation[] }) => {
  const [dataSource, setDataSource] = useState(studentTxn)
  const [value, setValue] = useState("")

  const columns: TableColumnsType<Donation> = [
    {
      title: "DTI",
      dataIndex: "dti",
      key: 'dti'
    },
    {
      title: "Transaction ID",
      dataIndex: "txId",
      key: 'txId',
      render: (txId, record) => (
        getTxId(txId, record.paymentMethod)
      )
    },
    {
      title: "Student Name",
      dataIndex: "recipientId",
      key: 'recipientId',
      render: (id) => (
        <StudentNameComp id={id} />
      )
    },
    {
      title: (
        <p className="flex gap-2 items-center">
          <FaBitcoin className="text-yellow" /> <span>Amount Donated</span>
        </p>
      ),
      dataIndex: "amount",
      sorter: (a, b) => Number(BigInt(a.amount)) - Number(BigInt(b.amount)),
      key: 'amount',
      render: (amt, record) => (
        formatAmount(amt, record.paymentMethod)
      ),
    },

    {
      title: "Donor",
      dataIndex: "donater",
      filters: toFilterArray(studentTxn, "donater"),
      onFilter: (value: any, record) => record.donater.indexOf(value) > -1,
      filterSearch: true,
      key: 'donater',
      render: (addr, record) => (
        getAccountId(addr, record.paymentMethod)
      ),
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
          const filteredData = studentTxn.filter((entry) =>
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
