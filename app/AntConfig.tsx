"use client"
import { ConfigProvider } from "antd"
import React from "react"

export const AntConfig = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#57CC99",
            borderRadius: 5,
            fontFamily: "Urbanist, sans-serif",
          },
        }}
      >
        {children}
      </ConfigProvider>
    </>
  )
}
