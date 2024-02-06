"use client"
import React from "react"
import { Logo } from "./Logo"
import Link from "next/link"
import { BiDonateHeart } from "react-icons/bi"
import { FaWpexplorer } from "react-icons/fa"
import { usePathname } from "next/navigation"
import { ConnectWallet } from "./ConnectWallet"

export const Header = () => {
  const pathname = usePathname()
  const txActive =
    pathname === "/tx-explorer" ? "text-white bg-grey-700" : "bg-grey-100"
  const donateActive = pathname.includes("school")
    ? "text-white bg-grey-700"
    : "bg-grey-100"
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
                className={`inline-block px-5 py-3 text-sm md:text-md rounded-[24px] flex items-center gap-[10px] hover:bg-grey-700 hover:text-white transition-all duration-2 ease-in-out ${donateActive}`}
              >
                <BiDonateHeart className="inline" /> <span>Donate</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/tx-explorer"}
                className={`inline-block px-5 py-3 text-sm md:text-md rounded-[24px] flex items-center gap-[10px] hover:bg-grey-700 hover:text-white transition-all duration-2 ease-in-out ${txActive}`}
              >
                <FaWpexplorer className="inline" /> <span>Tx Explorer</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <ConnectWallet />
    </header>
  )
}
