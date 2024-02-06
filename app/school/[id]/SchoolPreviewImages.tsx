"use client"
import React from "react"
import { Image } from "antd"

export const SchoolPreviewImages = () => {
  return (
    <Image.PreviewGroup
      preview={{
        onChange: (current, prev) =>
          console.log(`current index: ${current}, prev index: ${prev}`),
      }}
    >
      <div className="grid grid-rows-3 grid-flow-col gap-4 h-[32rem]">
        <div className="md:row-span-3 row-span-2 h-full">
          <Image
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="IED Hack"
            style={{ objectFit: "cover", borderRadius: "5px" }}
            height={"100%"}
            width={"100%"}
          />
        </div>
        <div className="col-span-2 h-full">
          <Image
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="IED Hack"
            style={{ objectFit: "cover", borderRadius: "5px" }}
            height={"100%"}
            width={"100%"}
          />
        </div>
        <div className="row-span-2 md:col-span-2  h-full">
          <Image
            src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="IED Hack"
            style={{ objectFit: "cover", borderRadius: "5px" }}
            height={"100%"}
            width={"100%"}
          />
        </div>
      </div>
    </Image.PreviewGroup>
  )
}
