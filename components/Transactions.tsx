"use client"
import React, { useEffect, useState } from "react"
import { Input, Table, Tooltip } from "antd"
import type { TableColumnsType } from "antd"
import { BiSearch } from "react-icons/bi"
import { FaBitcoin, FaInfoCircle } from "react-icons/fa"
import { Donation } from "@/utils/declarations/backend/backend.did"
import { getSchoolById, getStudentById } from "@/utils/backend-service"
import { truncateAddress } from "@/utils/formatter"
import Link from "next/link"
import { FaRegEye } from "react-icons/fa"
import { TransactionPreview } from "./TransactionPreview"

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

const NameComp = ({ id, donationTo }: { id: bigint, donationTo: bigint }) => {
    const [name, setName] = useState("")

    useEffect(() => {
        async function fetchData() {
            if (donationTo == BigInt(0)) {
                const res = await getSchoolById(id)
                setName(res.name)
            } else {
                const res = await getStudentById(id)
                setName(res.name)
            }
        }
        fetchData()
    }, [id, donationTo])

    return <>{name}</>
}

const formatAmount = (amount: bigint, paymentType: bigint) => {
    let formatted_amount = (Number(BigInt(amount)) / Number(BigInt(10 ** 8))).toString()
    if (paymentType == BigInt(0)) {
        return <>{formatted_amount} BTC</>
    } else {
        return <>{formatted_amount} ckBTC</>
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

export const Transactions = ({
    Txn,
}: {
    Txn: Donation[]
}) => {
    const [dataSource, setDataSource] = useState(Txn)
    const [value, setValue] = useState("")

    const columns: TableColumnsType<Donation> = [
        {
            title: (
                <Tooltip title="See preview of the transaction details">
                    <FaInfoCircle className="text-primary" />
                </Tooltip>
            ),
            dataIndex: "dti",
            key: "dti",
            render: (dti, record) => (
                <TransactionPreview donation={record} donationTo={Number(record.donationTo)}>
                    <div className="p-2 border-[1px] border-grey-600 rounded-md bg-grey-800 inline-block cursor-pointer">
                        <FaRegEye />
                    </div>
                </TransactionPreview>
            ),
        },
        {
            title: "DTI",
            dataIndex: "dti",
            key: "dti",
            render: (dti) => (
                <>
                    <p className="">{truncateAddress(dti)}</p>
                </>
            ),
        },
        {
            title: "Transaction ID",
            dataIndex: "txId",
            key: "txId",
            render: (txId, record) => getTxId(txId, record.paymentMethod),
        },
        {
            title: "Name",
            dataIndex: "recipientId",
            key: "recipientId",
            render: (id, record) => <NameComp id={id} donationTo={record.donationTo} />,
        },
        {
            title: (
                <p className="flex gap-2 items-center">
                    <FaBitcoin className="text-yellow" /> <span>Amount Donated</span>
                </p>
            ),
            dataIndex: "amount",
            sorter: (a, b) => Number(BigInt(a.amount)) - Number(BigInt(b.amount)),
            key: "amount",
            render: (amt, record) => formatAmount(amt, record.paymentMethod),
        },

        {
            title: "Donor",
            dataIndex: "donater",
            filters: toFilterArray(Txn, "donater"),
            onFilter: (value: any, record) => record.donater.indexOf(value) > -1,
            filterSearch: true,
            key: "donater",
            render: (addr, record) => getAccountId(addr, record.paymentMethod),
        },
    ]
    return (
        <div>
            <p className="mb-2">Search Donations with DTI or Transaction ID</p>
            <Input
                placeholder="DTI or Transaction ID"
                prefix={<BiSearch />}
                size="large"
                className="mb-4 md:w-1/3 w-full"
                value={value}
                onChange={(e) => {
                    const currValue = e.target.value
                    setValue(currValue)
                    const filteredData = Txn.filter((entry) =>
                        entry.dti.toLowerCase().includes(currValue.toLowerCase()) ||
                        entry.txId.toLowerCase().includes(currValue.toLowerCase())
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
