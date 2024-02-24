"use client"
import React, { useEffect, useState } from "react"
import { Input, Table } from "antd"
import type { TableColumnsType, TableProps } from "antd"
import { BiSearch } from "react-icons/bi"
import { FaBitcoin } from "react-icons/fa"
import { Donation } from "@/utils/declarations/backend/backend.did"
import { formatAmount, getAccountId, getTxId, truncateAddress } from "@/app/tx-explorer/page"
import { getSchoolById } from "@/utils/backend-service"

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

const SchoolNameComp = ({ id }: { id: bigint }) => {
  const [name, setName] = useState("")

  useEffect(() => {
    async function fetchData() {
      const res = await getSchoolById(id);
      setName(res.name);
    }
    fetchData()
  }, [id]);

  return (
    <>{name}</>
  )
};


export const SchoolTransactions = ({ schoolTxn }: { schoolTxn: Donation[] }) => {
  const [dataSource, setDataSource] = useState(schoolTxn)
  const [value, setValue] = useState("")

  console.log(dataSource);

  const columns: TableColumnsType<Donation> = [
    {
      title: "DTI",
      dataIndex: "dti",
      key: 'dti',
      render: (dti) => (
        <>{truncateAddress(dti)}</>
      )
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
      title: "School Name",
      dataIndex: "recipientId",
      key: 'recipientId',
      render: (id) => (
        <SchoolNameComp id={id} />
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
      filters: toFilterArray(schoolTxn, "donater"),
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
      {/* <div className="flex items-end flex-col justify-end mb-4">
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
      </div> */}
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
