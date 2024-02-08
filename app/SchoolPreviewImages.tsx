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
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 md:h-[32rem] min-w-full">
        {images.map((image, index) => {
          return (
            <div key={index} className="md:h-full md:col-span-1 col-span-3">
              <Image
                src={image}
                alt="IED Hack"
                style={{ objectFit: "cover", borderRadius: "5px" }}
                height={"100%"}
                width={"100%"}
              />
            </div>
          )
        })}
      </div>
    </Image.PreviewGroup>
  )
}
