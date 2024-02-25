"use client"
import { Button, Image, Modal } from "antd"

import React from "react"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { NNSLogo } from "./NNSLogo"

export const NNSPayment = () => {
  const [isConnected, setIsConnected] = React.useState(false)
  const [visible, setVisible] = React.useState(false)
  return (
    <div>
      <Button
        className="border-primary w-full"
        size="large"
        onClick={() => setVisible(true)}
      >
        NNS
      </Button>
      <Modal
        title="NNS Payment"
        open={visible}
        footer={false}
        closeIcon={
          <IoIosCloseCircleOutline className="text-2xl text-primary" />
        }
        className="md:min-w-[30rem]"
        onCancel={() => setVisible(false)}
      >
        {isConnected ? (
          <>
            <div>
              <div className="flex justify-end">
                <Button
                  className="bg-primary"
                  size="large"
                  onClick={() => setIsConnected(false)}
                >
                  Disconnect
                </Button>
              </div>
              <div className="my-10">
                <p>Summary</p>
              </div>
              <Button
                className="bg-primary w-full"
                size="large"
                onClick={() => setIsConnected(true)}
              >
                Approve
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center my-8">
            <div className="w-[15rem]">
              <NNSLogo />
            </div>
            <Button
              className="bg-primary w-full"
              size="large"
              onClick={() => setIsConnected(true)}
            >
              Connect
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
