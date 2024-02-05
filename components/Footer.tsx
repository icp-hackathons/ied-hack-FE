import Link from "next/link"
import React from "react"
import { BsGithub } from "react-icons/bs"

export const Footer = () => {
  return (
    <footer className="bg-grey-800 px-10 py-5 flex md:flex-row flex-col gap-4 justify-between items center text-grey-200">
      <p>
        <Link
          href={
            "https://summit.immersiveeducation.org/SouthAfrica/2024/hackathon.html"
          }
          target="_blank"
          className="hover:underline"
        >
          © 2024 IED Hackathon
        </Link>
      </p>
      <div>
        <Link href={""} target="_blank" className="flex items-center gap-4">
          <p>
            <code>Github Repository</code>
          </p>
          <BsGithub className="text-2xl" />
        </Link>
      </div>
    </footer>
  )
}
