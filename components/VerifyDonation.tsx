"use client"
import { makeDonation } from "@/utils/backend-service"
import { Divider, Input, Button, Result, Modal } from "antd"
import validate, { Network } from "bitcoin-address-validation"
import Link from "next/link"
import React, { useState } from "react"
import { CgCheck, CgCopy } from "react-icons/cg"

export const VerifyDonation = ({
  children,
  getDonationInputs,
  paymentMethod,
}: {
  children?: React.ReactNode
  getDonationInputs: Function
  paymentMethod: string
}) => {
  const [address, setAddress] = useState("")
  const [dti, setDTI] = useState("");
  const [txId, setTxId] = useState("")
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [resultStatus, setResultStatus] = useState<
    "success" | "error" | undefined
  >()
  const [resultMessage, setResultMessage] = useState("")
  const [copied, setCopied] = useState(false)

  const sendDonationForConfirmation = async () => {
    if (!validate(address, Network.testnet) || !txId) {
      setResultMessage("Invalid address or tx Id passed in");
      return
    }
    const donationOutputs = getDonationInputs(address, txId, paymentMethod)
    try {
      setLoading(true)
      await makeDonation(donationOutputs).then((resp: any) => {
        if (resp.err) {
          console.log(resp.err)
          throw new Error("error in making donation")
        }
        setDTI(resp.ok)
      })
    } catch (error) {
      setResultMessage("Failed to verify your donation.")
    } finally {
      setLoading(false)
      setShowResult(true)
    }
  }

  return (
    <>
      <div className="min-w-[20rem] w-full">
        <h3 className="text-center text-2xl font-[500]">
          Verify your donation
        </h3>
        <Divider>Use the transaction ID to verify your donation.</Divider>
        <Input
          size="large"
          placeholder="Your Bitcoin Address"
          className="w-full mb-2"
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          size="large"
          placeholder="Bitcoin Transaction ID"
          className="w-full mb-2"
          onChange={(e) => setTxId(e.target.value)}
        />
        {resultMessage !== "" ? <small className="w-full mb-2" style={{ color: "red", fontSize: '12px' }}>{resultMessage}</small> : <></>}
        <Button
          loading={loading}
          className="bg-primary px-3 rounded-md text-white w-full content-center"
          size="large"
          onClick={() => sendDonationForConfirmation()}
          disabled={loading || !address || !txId}
        >
          {loading ? "Verifying Donation" : "Continue"}
        </Button>
      </div>
      <Modal open={showResult} onCancel={() => setShowResult(false)}>
        <Result
          status={resultStatus}
          title="Transaction submitted succesfully! <br> Awaiting blockchain confirmation."
          subTitle={
            <>
              Your DTI
              <div className="flex justify-between items-center gap-2 resultBox">
                <p className="border-[1px] border-grey-500 p-2 rounded-md w-full">
                  {dti}
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(dti)
                    setCopied(true)
                    setTimeout(() => {
                      setCopied(false)
                    }, 3000)
                  }}
                  className="border-primary border-[1px] px-3 py-2 rounded-md text-white flex items-center gap-2"
                >
                  {copied ? <CgCheck className="font-[24px]" /> : <CgCopy />}
                  <span>{!copied ? "Copy" : "Copied!"}</span>
                </button>
              </div>
            </>
          }
          extra={[
            <Link key="view" href={"/tx-explorer"}>
              <Button
                type="primary"
                className="bg-green"
              >
                Go to Explorer
              </Button>
            </Link>
            ,
            <Button
              type="primary"
              key="close"
              className="bg-primary"
              onClick={() => setShowResult(false)}
            >
              Close
            </Button>,
          ]}
        />
      </Modal>
    </>
  )
}