import Image from "next/image"
import Link from "next/link"
import React from "react"

export const Header = () => {
  return (
    <div>
      <div className="main-header text-white border-b-grey-700 border-b-[1px] px-[6rem] py-6">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-7 items-center">
            <span className="text-xl">
              <span>
                i<span className="text-red-500">ED </span>
              </span>
              Hackathon
            </span>
            <nav>
              <ul className="flex gap-4 text-grey-200">
                <li>
                  <Link href={""}>Docs</Link>
                </li>
                <li>
                  <Link href={""}>Schools</Link>
                </li>
                <li>
                  <Link href={""}>Tx Explorer</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="inline-flex flex-col gap-3 cursor-pointer">
            <div className="w-10 h-[1px] bg-grey-300" />
            <div className="w-10 h-[1px] bg-grey-300" />
          </div>
        </div>
      </div>
      {/* GLOW */}
      <div className="glow w-[20rem] h-[25rem] bg-transperant  absolute top-0 left-[30%] translate-y-[-115%]"></div>
      {/* Tag Text */}
    </div>
  )
}
