import React from "react"
import Image from "next/legacy/image"
import Link from "next/link"

export const Logo = () => {
  return (
    <Link href="/">
      <Image src={"/ied.png"} alt="IED Hackathon" width={200} height={200} />
    </Link>
  )
}
