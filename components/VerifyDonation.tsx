"use client"
import { makeDonation } from "@/utils/backend-service"
import { Divider, Input, Popover, Button, Result, Modal } from "antd"
import React, { useState } from "react"

export const VerifyDonation = ({
  children,
  getDonationInputs,
  paymentMethod,
}: {
  children?: React.ReactNode
  getDonationInputs: Function
  paymentMethod: string
}) => {
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState("")
  const [txId, setTxId] = useState("")
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [resultStatus, setResultStatus] = useState<
    "success" | "error" | undefined
  >()
  const [resultMessage, setResultMessage] = useState("")

  const sendDonationForConfirmation = async () => {
    if (!address || !txId) {
      return
    }
    console.log(address, txId)
    const donationOutputs = getDonationInputs(address, txId, paymentMethod)
    try {
      setLoading(true)
      await makeDonation(donationOutputs).then((resp: any) => {
        if (resp.err) {
          console.log(resp.err)
          return
        }
        console.log(resp.ok)
      })
      setResultStatus("success")
      setResultMessage("Successfully verified your donation!")
    } catch (error) {
      console.log(error)
      setResultStatus("error")
      setResultMessage("Failed to verify your donation.")
    } finally {
      setLoading(false)
      setShowResult(true)
    }
  }

  return (
    <>
      {/* <Popover
        open={open}
        trigger={"click"}
        onOpenChange={() => setOpen(!open)}
        placement="bottom"
        content={
          <div className="min-w-[20rem] w-[30rem]">
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
            <Button
              loading={loading}
              className="bg-green-light px-3 py-2 rounded-md text-white w-full content-center"
              onClick={() => sendDonationForConfirmation()}
            >
              {loading ? "Verifying Donation" : "Continue"}
            </Button>
          </div>
        }
      >
        {children}
      </Popover> */}
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
          title="Successfully Verified your Donation!"
          // subTitle={`Transaction ID: ${txId} has been verified.`}
          extra={[
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
