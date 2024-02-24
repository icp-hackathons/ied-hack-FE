"use client"
import { Input, Tabs, Select, Divider } from "antd"
import type { TabsProps } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import { FaBitcoin } from "react-icons/fa"
import { QRCode } from "@/components/QRCode"
import { SchoolOutput, DonationParams, Category, DonationParamsNNS } from "@/utils/declarations/backend/backend.did"
import { AuthClient } from "@dfinity/auth-client"
import { makeBackendActor } from "@/utils/backend-actor-locator"
import { approveICPSpend } from "@/utils/ledger-service"

const onChange = (key: string) => {
  console.log(key)
}

export const makeDonationNNS = async (
  donation: DonationParamsNNS,
  authClient?: AuthClient
) => {
  console.log(authClient);
  const backendService = await makeBackendActor(authClient);
  const backendId = await backendService.get_canister_id();
  if (authClient) {
    await approveICPSpend(backendId, donation.amount, authClient);
  } else {
    throw new Error("No auth found");
  }
  return backendService.pay_with_nns(donation);
};

export const Donate = ({ school, address }: { school: SchoolOutput, address: string }) => {
  const [donationType, setDonationType] = useState("divide_equaly")

  const [donation, setDonation] = useState(0)
  const [cdd, setCdd] = useState<number | string>(0)
  const [ts, setTs] = useState<number | string>(0)
  const [ss, setSs] = useState<number | string>(0)
  const [las, setLas] = useState<number | string>(0)
  const [paymentMethod, setPaymentMethod] = useState<number>(0);
  const sum = Number(cdd) + Number(ts) + Number(ss) + Number(las)

  const toPercentage = (value: number, total: number) => {
    if (sum < total) {
      return ((value / 100) * total).toPrecision(9)
    }
    return 0
  }

  const formFilled = () => donation !== 0 && cdd !== 0 && ts !== 0 && ss !== 0 && las !== 0

  const satoshi = 100000000

  const getDonationInputs = (txId: string, address: string) => {

    const category: Category = {
      ls: BigInt(Number(las) * satoshi),
      ss: BigInt(Number(ss) * satoshi),
      ts: BigInt(Number(ts) * satoshi),
      cdd: BigInt(Number(cdd) * satoshi),
      categoryType: donationType === "divide_equaly" ? BigInt(0) : BigInt(1)
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

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Exact Amount",
      children: (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Input
              className="w-full"
              size="large"
              placeholder="Carriculum design and development"
              type="number"
              onChange={(e) => setCdd(Number(e.target.value).toPrecision(9))}
            />
          </div>
          <div>
            <Input
              className="w-full"
              size="large"
              placeholder="Teacher support"
              type="number"
              onChange={(e) => setTs(Number(e.target.value).toPrecision(9))}
            />
          </div>
          <div>
            <Input
              className="w-full"
              size="large"
              placeholder="School support"
              type="number"
              onChange={(e) => setSs(Number(e.target.value).toPrecision(9))}
            />
          </div>
          <div>
            <Input
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
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Input
                className="w-full"
                size="large"
                placeholder="Carriculum design and development"
                type="number"
                onChange={(e) =>
                  setCdd(toPercentage(Number(e.target.value), Number(donation)))
                }
              />
            </div>
            <div>
              <Input
                className="w-full"
                size="large"
                placeholder="Teacher support"
                type="number"
                onChange={(e) =>
                  setTs(toPercentage(Number(e.target.value), Number(donation)))
                }
              />
            </div>
            <div>
              <Input
                className="w-full"
                size="large"
                placeholder="School support"
                type="number"
                onChange={(e) =>
                  setSs(toPercentage(Number(e.target.value), Number(donation)))
                }
              />
            </div>
            <div>
              <Input
                className="w-full"
                size="large"
                placeholder="Lunch and snacks"
                type="number"
                onChange={(e) =>
                  setLas(toPercentage(Number(e.target.value), Number(donation)))
                }
              />
            </div>
          </div>
        </div>
      ),
    },
  ]

  useEffect(() => {
    if (donationType === "divide_equaly") {
      setCdd(Number(donation / 4).toPrecision(9))
      setTs(Number(donation / 4).toPrecision(9))
      setSs(Number(donation / 4).toPrecision(9))
      setLas(Number(donation / 4).toPrecision(9))
    }
  }, [donation, donationType])
  return (
    <div className="bg-white p-4 rounded-lg md:w-[30%] w-full min-h-[20rem]">
      <h2 className="text-lg font-[500]">Make a Donation</h2>

      <div className="my-[1rem] flex gap-3">
        <Input
          className="w-full"
          size="large"
          placeholder="Input amount to donate"
          type="number"
          onChange={(e) => setDonation(Number(e.target.value))}
        />
        <Select
          placeholder="Donation Type"
          options={[
            { value: "divide_equaly", label: "Divide Equaly" },
            { value: "custom_donation", label: "Custom Donation" },
          ]}
          onChange={(value) => setDonationType(value)}
          size="large"
          className="w-full"
        />
      </div>

      {donationType === "custom_donation" && (
        <div className="my-4">
          <p className="">Custom Donation</p>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      )}

      <Divider />
      <p className="text-lg text-center mb-4">Summary</p>
      <ul className="pl-2 text-sm">
        <li className="flex justify-between items-center">
          <span>Carriculum design and development</span>
          <span>$ {cdd}</span>
        </li>
        <li className="flex justify-between items-center">
          <span>Teacher suppoert</span>
          <span>$ {ts}</span>
        </li>
        <li className="flex justify-between items-center">
          <span>School support</span>
          <span>$ {ss}</span>
        </li>
        <li className="flex justify-between items-center">
          <span>Lunch and snacks</span>
          <span>$ {las}</span>
        </li>
      </ul>
      <QRCode amount={donation} address={address} placement="bottom" getDonationInputs={getDonationInputs}>
        <button disabled={!formFilled()} className="bg-green-light text-white w-full rounded-md p-2 mt-4 flex items-center gap-2 justify-center">
          <FaBitcoin className="inline text-yellow" />
          <span>Donate</span>
        </button>
      </QRCode>
    </div>
  )
}
