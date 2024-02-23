"use client"
import { ConfigProvider, theme } from "antd"
import React from "react"

export const AntConfig = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#fd366e",
            borderRadius: 5,
            fontFamily: "Urbanist, sans-serif",
          },
          algorithm: theme.darkAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </>
  )
}
