import { Header } from "@/components/Header"
import Image from "next/image"
import React from "react"

const SchoolPage = () => {
  return (
    <div className="bg-[#cfcfcf67] m-2 p-[2rem] rounded-md urbanist min-h-[98vh] relative overflow-hidden">
      <div className="absolute left-1/2 top-0 -ml-[39rem] w-[113.125rem] max-w-none h-[40rem] z-[-1]">
        <Image fill alt="beams" src={"/beams-basic.png"} />
      </div>
      <Header />
    </div>
  )
}

export default SchoolPage
