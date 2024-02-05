import Image from "next/image"
import Link from "next/link"
import React from "react"
import { FaBolt } from "react-icons/fa"
import { MdSchool } from "react-icons/md"
import { LuRocket } from "react-icons/lu"

export const Right = () => {
  return (
    <div className="md:w-[75%] bg-green h-full lg:px-[7rem] lg:py-[40px] md:p-[24px] p-[1rem] lg:pb-[0rem] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.5] z-[1]">
        <Image src="/patterns.png" alt="IED Hackathon" fill />
      </div>

      <div className="z-[100] relative">
        <nav className="text-gray-300 flex justify-between items-center mb-[3rem]">
          <ul className="flex gap-7">
            <li>
              <Link href={"/donate"} className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href={"/donate"} className="hover:text-white">
                Explorer
              </Link>
            </li>
          </ul>
          <button className="text-black bg-white px-[1.5rem] py-[0.6rem]">
            Donate
          </button>
        </nav>
        <h2 className="text-white ">
          <span className="alegreya md:text-[7rem] md:leading-[7rem] text-[4.3rem] leading-[4.7rem] font-semibold">
            Changing lives f
            <span className="relative">
              0
              <span className="absolute md:top-[1.5rem] top-[0.1rem] right-[-10px]">
                <MdSchool className="text-[32px] text-[#04E762]" />
              </span>
            </span>
            r the better, o
            <span className="relative">
              n
              <span className="absolute md:top-[2.4rem] top-[0.5rem] right-[-20px]">
                <FaBolt className="text-[32px] text-yellow" />
              </span>
            </span>
            e donation at a tim
            <span className="relative">
              e
              <span className="absolute md:top-[2.5rem] top-[0.5rem] right-[-36px]">
                <LuRocket className="text-[32px] text-[#FB6107]" />
              </span>
            </span>
            .
          </span>
        </h2>
        <div className="relative w-full h-[35rem] mt-[2.5rem]">
          <Image
            src="/landing2.jpg"
            alt="IED Hackathon"
            fill
            objectFit="cover"
            className="rounded-t-[1rem]"
          />
        </div>
      </div>
    </div>
  )
}
