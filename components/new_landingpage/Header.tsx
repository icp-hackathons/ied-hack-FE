"use client"
import Link from "next/link"
import React from "react"
import { NavMenu } from "./NavMenu"

export const Header = ({
  setOpen,
}: {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const navRef = React.useRef(null)
  const [activeHam, setActiveHam] = React.useState(false)

  return (
    <div>
      <div className="main-header text-white border-b-grey-700 border-b-[1px] md:px-[6rem] px-[1rem] py-6">
        <div className="flex justify-between items-center w-full ">
          <div className="flex gap-7 items-center">
            <Link href={"/"} className="text-xl relative z-[110]">
              <span>
                i<span className="text-red-500">ED </span>
              </span>
              Hackathon
            </Link>
            <nav className="md:block hidden z-[50] relative">
              <ul className="flex gap-4 text-grey-200">
                <li>
                  <Link
                    href={"https://github.com/osas2211/ied-hack-FE/#readme"}
                    target="_blank"
                    className="hover:underline"
                  >
                    Docs
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/schools"}
                    className="hover:underline"
                    onClick={setOpen ? () => setOpen(false) : () => ""}
                  >
                    Schools
                  </Link>
                </li>
                <li>
                  <Link href={"/tx-explorer"} className="hover:underline">
                    Tx Explorer
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div
            className="relative gap-3 cursor-pointer z-[110] p-5 -mb-10 hamburger"
            onClick={() => setActiveHam(!activeHam)}
          >
            <div
              className={`w-10 h-[1px] bg-grey-300 absolute top-0 left-0 z-[110] transition-all duration-300 ${activeHam
                  ? "translate-y-[0] rotate-[45deg]"
                  : "translate-y-[-5px]"
                }`}
            />
            <div
              className={`w-10 h-[1px] bg-grey-300 absolute top-0 left-0 z-[110] transition-all duration-300 ${activeHam
                  ? "translate-y-[0] rotate-[-45deg]"
                  : "translate-y-[5px]"
                }`}
            />
          </div>
        </div>
      </div>
      {/* GLOW */}
      <div className="glow w-[20rem] h-[25rem] bg-transperant  absolute top-0 left-[30%] translate-y-[-115%]"></div>
      {/* Tag Text */}
      {/* {activeHam && <NavMenu active={activeHam} />} */}
      <NavMenu active={activeHam} setOpen={setOpen} />
    </div>
  )
}
