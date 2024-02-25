"use client"
import React, { useRef, useState } from "react"
import { Button, Tour } from "antd"
import type { TourProps } from "antd"

interface props {
  openCkBTCpaymentTour: boolean
  setOpenCkBTCpaymentTour: React.Dispatch<React.SetStateAction<boolean>>
}

export const CkBTCPaymentTour: React.FC<props> = ({
  openCkBTCpaymentTour,
  setOpenCkBTCpaymentTour,
}) => {
  const ref = useRef(null)

  const steps: TourProps["steps"] = [
    {
      title: "Center",
      description: "Displayed in the center of screen.",
      target: null,
    },
    {
      title: "Right",
      description: "On the right of target.",
      placement: "right",
      target: null,
    },
    {
      title: "Top",
      description: "On the top of target.",
      placement: "top",
      target: null,
    },
  ]

  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpenCkBTCpaymentTour(true)}
        ref={ref}
      >
        Begin Tour
      </Button>

      <Tour
        open={openCkBTCpaymentTour}
        onClose={() => setOpenCkBTCpaymentTour(false)}
        steps={steps}
      />
    </>
  )
}
