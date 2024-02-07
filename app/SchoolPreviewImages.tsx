"use client"
import React from "react"
import { Image } from "antd"

export const SchoolPreviewImages = ({ images }: { images: any[] }) => {
  return (
    <Image.PreviewGroup
      preview={{
        onChange: (current, prev) =>
          console.log(`current index: ${current}, prev index: ${prev}`),
      }}
    >
      <div className="grid grid-rows-3 grid-flow-col gap-4 h-[32rem]">
        {images.map((image, index) => {
          return (
            <div key={index} className="md:row-span-3 row-span-2 h-full">
              <Image
                src={image}
                alt="IED Hack"
                style={{ objectFit: "cover", borderRadius: "5px" }}
                height={"100%"}
                width={"100%"}
              />
            </div>)
        })}
      </div>
    </Image.PreviewGroup>
  )
}
