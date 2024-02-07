"use client"
import Image from "next/legacy/image"
import Link from "next/link"
import React, { useEffect } from "react"
import { FaBolt } from "react-icons/fa"
import { MdSchool } from "react-icons/md"
import { LuRocket } from "react-icons/lu"
import { gsap } from "gsap"

export const Right = () => {
  useEffect(() => {
    // gsap.fromTo(
    //   ".reveal-text",
    //   {
    //     duration: 1.5,
    //     delay: 0,
    //     y: 700,
    //     stagger: {
    //       amount: 0.5,
    //     },
    //     ease: "power4.out",
    //   },
    //   { y: 0 }
    // )
    // gsap.fromTo(
    //   ".reveal-image",
    //   {
    //     duration: 1.5,
    //     delay: 0.5,
    //     opacity: 0.5,
    //     stagger: {
    //       amount: 2,
    //     },
    //     ease: "power4.out",
    //   },
    //   { opacity: 1 }
    // )
  }, [])

  return (
    <div className="md:w-[75%] bg-green h-full lg:px-[7rem] lg:py-[40px] md:p-[24px] p-[1rem] lg:pb-[0rem] pb-0 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-[1] opacity-[0.5]">
        <Image src="/patterns.png" alt="IED Hackathon" layout="fill" />
      </div>

      <div className="z-[100] relative">
        <nav className="text-gray-300 flex justify-between items-center mb-[3rem]">
          <ul className="flex gap-7">
            <li>
              <Link href={""} className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href={"/tx-explorer"} className="hover:text-white">
                Explorer
              </Link>
            </li>
          </ul>
          <Link
            href={"/#schools"}
            className="text-black bg-white px-[1.5rem] py-[0.6rem]"
          >
            Donate
          </Link>
        </nav>
        <h2 className="text-white reveal-text">
          <span className="alegreya md:text-[7rem] md:leading-[7rem] text-[3.7rem] leading-[4rem] font-semibold">
            Changing lives f
            <span className="relative">
              0
              <span className="absolute md:top-[1.5rem] top-[0.1rem] right-[-10px]">
                <MdSchool className="md:text-[32px] text-[24px] text-[#04E762]" />
              </span>
            </span>
            r the better, o
            <span className="relative">
              n
              <span className="absolute md:top-[2.4rem] top-[0.9rem] right-[-15px]">
                <FaBolt className="md:text-[32px] text-[24px] text-yellow" />
              </span>
            </span>
            e donation at a tim
            <span className="relative">
              e
              <span className="absolute md:top-[2.5rem] top-[0.9rem] right-[-30px]">
                <LuRocket className="md:text-[32px] text-[24px] text-[#FB6107]" />
              </span>
            </span>
            .
          </span>
        </h2>
        <div className="relative w-full md:h-[35rem] h-[25rem] mt-[2.5rem] reveal-image">
          <Image
            src="/landing2.jpg"
            alt="IED Hackathon"
            layout="fill"
            objectFit="cover"
            className="rounded-t-[1rem]"
          />
        </div>
      </div>
    </div>
  )
}
