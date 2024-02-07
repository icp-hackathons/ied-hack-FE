"use client"
import React from "react"
import { Logo } from "./Logo"
import Link from "next/link"
import { BiDonateHeart } from "react-icons/bi"
import { FaWpexplorer } from "react-icons/fa"
import { usePathname } from "next/navigation"
import { ConnectWallet } from "./ConnectWallet"
import { BsGithub } from "react-icons/bs"

export const Header = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const pathname = usePathname()
  const txActive =
    pathname === "/tx-explorer" ? "text-white bg-green-light" : "bg-grey-100"
  const donateActive =
    pathname === "/" ? "text-white bg-green-light" : "bg-grey-100"
  return (
    <header className="flex justify-between items-center flex-wrap gap-5">
      <div className="flex items-center gap-[4rem]">
        <Link href={"/"}>
          <h2 className="alegreya text-sm font-normal">iED</h2>
          <h2 className="alegreya text-sm font-semibold leading-[5px]">
            Hackathon
          </h2>
        </Link>
        <nav>
          <ul className="flex items-center gap-7">
            <li>
              <Link
                href={"/#schools"}
                onClick={() => setOpen(false)}
                className={`inline-block md:px-5 px-3 md:py-3 py-2 text-sm rounded-[24px] flex items-center gap-[10px] hover:bg-green-light hover:text-white transition-all duration-2 ease-in-out ${donateActive}`}
              >
                <BiDonateHeart className="inline" /> <span>Donate</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/tx-explorer"}
                className={`inline-block md:px-5 px-3 md:py-3 py-2 text-sm rounded-[24px] flex items-center gap-[10px] hover:bg-green-light hover:text-white transition-all duration-2 ease-in-out ${txActive}`}
              >
                <FaWpexplorer className="inline" /> <span>Tx Explorer</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Link
        href={"https://github.com/osas2211/ied-hack-FE"}
        target="_blank"
        className="bg-green-light text-white px-[16px] py-[10px] rounded-md flex items-center gap-3"
      >
        <BsGithub className="inline" />
        <span>Github Repository</span>
      </Link>
      {/* <Logo /> */}
    </header>
  )
}
