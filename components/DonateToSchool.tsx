"use client"
import React, { useEffect, useState } from "react"
import { Button, Input, Modal, Select, Tabs, TabsProps, Popover } from "antd"

import { IoIosCloseCircleOutline } from "react-icons/io"
import { FaBitcoinSign } from "react-icons/fa6"
import { FaPercent } from "react-icons/fa"
import { QRCode } from "@/components/QRCode"
import {
  SchoolOutput,
  DonationParams,
  Category,
  DonationParamsNNS,
} from "@/utils/declarations/backend/backend.did"
import { AuthClient } from "@dfinity/auth-client"
import { makeBackendActor } from "@/utils/backend-actor-locator"
import { approveICPSpend } from "@/utils/ledger-service"
import { QRCodePaymentTour } from "./QRCodePaymentTour"
import { NNSPayment } from "./NNSPayment"
import { DonationPopover } from "./DonationPopover"

interface props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  school: SchoolOutput
  address: string
}

interface percentagesI {
  cdd: number
  ts: number
  ss: number
  las: number
}

export const makeDonationNNS = async (
  donation: DonationParamsNNS,
  authClient?: AuthClient
) => {
  console.log(authClient)
  const backendService = await makeBackendActor(authClient)
  const backendId = await backendService.get_canister_id()
  if (authClient) {
    await approveICPSpend(backendId, donation.amount, authClient)
  } else {
    throw new Error("No auth found")
  }
  return backendService.pay_with_nns(donation)
}

export const DonateToSchool = ({ open, setOpen, school, address }: props) => {
  const [openQRCodePaymentTour, setOpenQRCodePaymentTour] = useState(false)
  const [donationType, setDonationType] = useState("divide_equaly")
  const [donation, setDonation] = useState(0)
  const [cdd, setCdd] = useState<number | string>(0)
  const [ts, setTs] = useState<number | string>(0)
  const [ss, setSs] = useState<number | string>(0)
  const [las, setLas] = useState<number | string>(0)
  const [percentages, setPercentages] = useState<percentagesI>({
    cdd: 0,
    ts: 0,
    ss: 0,
    las: 0,
  })
  const [paymentMethod, setPaymentMethod] = useState<number>(0)
  const sum = Number(cdd) + Number(ts) + Number(ss) + Number(las)
  const resetValues = () => {
    setDonation(0)
    setCdd(0)
    setTs(0)
    setSs(0)
    setLas(0)
    setPercentages({ cdd: 0, ts: 0, ss: 0, las: 0 })
  }

  const toPercentage = (value: number, total: number) => {
    if (sum < total) {
      return ((value / 100) * total).toPrecision(9)
    }
    return 0
  }

  const formFilled = () =>
    donation > 0 ||
    (Number(cdd) > 0 && Number(ts) > 0 && Number(ss) > 0 && Number(las) > 0)

  const satoshi = 100000000

  const getDonationInputs = (txId: string, address: string) => {
    const category: Category = {
      ls: BigInt(Number(las) * satoshi),
      ss: BigInt(Number(ss) * satoshi),
      ts: BigInt(Number(ts) * satoshi),
      cdd: BigInt(Number(cdd) * satoshi),
      categoryType: donationType === "divide_equaly" ? BigInt(0) : BigInt(1),
    }

    console.log(category)

    const data: DonationParams = {
      donationTo: BigInt(0),
      txId: txId,
      donater: address,
      donationCategory: category,
      amount: BigInt(donation * satoshi),
      recipientId: school.id,
      paymentMethod: BigInt(paymentMethod),
    }
    return data
  }

  useEffect(() => {
    if (donationType === "divide_equaly") {
      setCdd(Number(donation / 4).toPrecision(9))
      setTs(Number(donation / 4).toPrecision(9))
      setSs(Number(donation / 4).toPrecision(9))
      setLas(Number(donation / 4).toPrecision(9))
    } else if (donationType === "custom_donation") {
      setCdd(toPercentage(Number(percentages.cdd), Number(donation)))
      setTs(toPercentage(Number(percentages.ts), Number(donation)))
      setSs(toPercentage(Number(percentages.ss), Number(donation)))
      setLas(toPercentage(Number(percentages.las), Number(donation)))
    }
  }, [donation, donationType, percentages])

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Exact Amount",
      children: (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Input
              prefix={<FaBitcoinSign className="text-yellow" />}
              className="w-full"
              size="large"
              placeholder="Carriculum design and development"
              type="number"
              onChange={(e) => setCdd(Number(e.target.value).toPrecision(9))}
            />
          </div>
          <div>
            <Input
              prefix={<FaBitcoinSign className="text-yellow" />}
              className="w-full"
              size="large"
              placeholder="Teacher support"
              type="number"
              onChange={(e) => setTs(Number(e.target.value).toPrecision(9))}
            />
          </div>
          <div>
            <Input
              prefix={<FaBitcoinSign className="text-yellow" />}
              className="w-full"
              size="large"
              placeholder="School support"
              type="number"
              onChange={(e) => setSs(Number(e.target.value).toPrecision(9))}
            />
          </div>
          <div>
            <Input
              prefix={<FaBitcoinSign className="text-yellow" />}
              className="w-full"
              size="large"
              placeholder="Lunch and snacks"
              type="number"
              onChange={(e) => setLas(Number(e.target.value).toPrecision(9))}
            />
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Percentage",
      children: (
        <div>
          {sum > donation && (
            <p className="text-red-500 text-sm">
              The sum of the donations should not be more than the total
              donation
            </p>
          )}
          <div className="mb-3">
            <p className="text-grey-200">Total Amount (100%)</p>
            <Input
              className="w-full"
              size="large"
              placeholder="Input amount to donate"
              type="number"
              onChange={(e) => {
                setDonation(Number(e.target.value))
                setCdd(0)
                setTs(0)
                setSs(0)
                setLas(0)
              }}
              prefix={<FaBitcoinSign className="text-yellow" />}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Input
                prefix={<FaPercent className="text-grey-300 text-[12px]" />}
                className="w-full"
                size="large"
                placeholder="Carriculum design and development"
                type="number"
                onChange={(e) =>
                  setPercentages({
                    ...percentages,
                    cdd: Number(e.target.value),
                  })
                }
                disabled={donation === 0}
              />
            </div>
            <div>
              <Input
                prefix={<FaPercent className="text-grey-300 text-[12px]" />}
                className="w-full"
                size="large"
                placeholder="Teacher support"
                type="number"
                onChange={(e) =>
                  setPercentages({ ...percentages, ts: Number(e.target.value) })
                }
                disabled={donation === 0}
              />
            </div>
            <div>
              <Input
                prefix={<FaPercent className="text-grey-300 text-[12px]" />}
                className="w-full"
                size="large"
                placeholder="School support"
                type="number"
                onChange={(e) =>
                  setPercentages({ ...percentages, ss: Number(e.target.value) })
                }
                disabled={donation === 0}
              />
            </div>
            <div>
              <Input
                prefix={<FaPercent className="text-grey-300 text-[12px]" />}
                className="w-full"
                size="large"
                placeholder="Lunch and snacks"
                type="number"
                onChange={(e) =>
                  setPercentages({
                    ...percentages,
                    las: Number(e.target.value),
                  })
                }
                disabled={donation === 0}
              />
            </div>
          </div>
        </div>
      ),
    },
  ]
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={false}
      closeIcon={<IoIosCloseCircleOutline className="text-2xl text-primary" />}
      className="md:min-w-[30rem]"
    >
      <div className="py-4">
        <h3 className="text-xl">Donate To {school.name}.</h3>
        <div className="my-5">
          <p className="text-grey-200">Donation Type</p>
          <Select
            className="w-full"
            size="large"
            placeholder={"Donation Type"}
            options={[
              { value: "divide_equaly", label: "Divide Equaly" },
              { value: "custom_donation", label: "Custom Donation" },
            ]}
            onChange={(value) => {
              resetValues()
              setDonationType(value)
            }}
          />
        </div>

        <div>
          {donationType === "divide_equaly" ? (
            <>
              <p className="text-grey-200">Amount to Donate</p>
              <Input
                className="w-full"
                size="large"
                placeholder="Input amount to donate"
                type="number"
                onChange={(e) => setDonation(Number(e.target.value))}
                prefix={<FaBitcoinSign className="text-yellow" />}
              />
            </>
          ) : (
            <>
              <div className="my-4">
                <Tabs
                  defaultActiveKey="1"
                  items={items}
                  onChange={resetValues}
                />
              </div>
            </>
          )}
        </div>

        <div className="my-5 mt-10">
          <p className="text-lg text-center mb-4">Summary</p>
          <ul className="pl-2 text-md">
            <li className="flex justify-between items-center mb-2">
              <span>Carriculum design and development</span>
              <span className="bg-grey-800 px-3 py-1 rounded-md border-[1px] border-grey-700 inline-flex items-center gap-1">
                <FaBitcoinSign className="text-yellow" /> {cdd}
              </span>
            </li>
            <li className="flex justify-between items-center mb-2">
              <span>Teacher suppoert</span>
              <span className="bg-grey-800 px-3 py-1 rounded-md border-[1px] border-grey-700 inline-flex items-center gap-1">
                <FaBitcoinSign className="text-yellow" /> {ts}
              </span>
            </li>
            <li className="flex justify-between items-center mb-2">
              <span>School support</span>
              <span className="bg-grey-800 px-3 py-1 rounded-md border-[1px] border-grey-700 inline-flex items-center gap-1">
                <FaBitcoinSign className="text-yellow" /> {ss}
              </span>
            </li>
            <li className="flex justify-between items-center mb-2">
              <span>Lunch and snacks</span>
              <span className="bg-grey-800 px-3 py-1 rounded-md border-[1px] border-grey-700 inline-flex items-center gap-1">
                <FaBitcoinSign className="text-yellow" /> {las}
              </span>
            </li>
          </ul>
        </div>

        <DonationPopover
          donation={donation}
          address={address}
          getDonationInputs={getDonationInputs}
          disabled={!formFilled()}
        />
      </div>
    </Modal>
  )
}
