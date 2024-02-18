"use client"
import React, { useEffect } from "react"
import { Logo } from "../Logo"
import { LiaDonateSolid } from "react-icons/lia"
import { BsFillArrowRightCircleFill } from "react-icons/bs"
import { FaWpexplorer } from "react-icons/fa"
import { PiStarFourThin } from "react-icons/pi"
import { gsap } from "gsap"
import Link from "next/link"
import { useGSAP } from "@gsap/react"

export const Left = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".reveal-text",
      {
        y: 500,
        stagger: {
          amount: 0.2,
        },
      },
      { y: 0, duration: 1.5, delay: 3.7, ease: "power4.out" }
    )
  })
  return (
    <div className="md:w-[25%] bg-yellow  overflow-hidden reveal-section">
      <div className="lg:p-[40px] md:p-[24px] p-[1rem]">
        <Logo />

        <div className="md:mt-[3rem] mt-[1.5rem]">
          <LiaDonateSolid className="md:text-[6rem] text-[3rem]" />
          <div>
            <h3 className="text-2xl font-semibold my-[1.5rem]">Donate Now</h3>
            <p className="text-[15px] mb-5 alegreya">
              Your Financial contribution can make a real difference. Every
              penny you donate goes into making the school and student life
              better.
            </p>
            <Link
              href={"/#schools"}
              className="font-semibold flex gap-2 items-center cursor-pointer hover:underline"
            >
              <span>Get Started</span>
              <BsFillArrowRightCircleFill className="text-lg" />
            </Link>
          </div>
        </div>

        <div className="w-full h-[1px] bg-black my-[2rem]" />

        <div>
          <FaWpexplorer className="md:text-[6rem] text-[3rem]" />
          <div>
            <h3 className="text-2xl font-semibold my-[1.5rem]">
              View Donations
            </h3>
            <p className="text-[15px] mb-5 alegreya">
              All donations are made public. You can look up your donations or
              any donation made to a school or student throught the Donation
              Transaction Explorer (DTE).
            </p>
            <Link
              href={"/tx-explorer"}
              className="font-semibold flex gap-2 items-center cursor-pointer hover:underline"
            >
              <span>Transactions Explorer</span>
              <BsFillArrowRightCircleFill className="text-lg" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-[5rem] relative h-[10rem]">
        <div className="w-[110%] ml-[-5%] py-[1rem] bg-black text-white text-center rotate-[15deg] absolute top-0 left-0 crossed-text  shadow-lg">
          <div className="flex gap-3 items-center text-scroll-effect-left">
            Support{" "}
            <span>
              <PiStarFourThin />
            </span>{" "}
            See Smile{" "}
            <span>
              <PiStarFourThin />
            </span>{" "}
            Support
            <span>
              <PiStarFourThin />
            </span>{" "}
            See Smile{" "}
            <span>
              <PiStarFourThin />
            </span>
            Support
            <span>
              <PiStarFourThin />
            </span>{" "}
            See Smile{" "}
            <span>
              <PiStarFourThin />
            </span>
            Support{" "}
            <span>
              <PiStarFourThin />
            </span>{" "}
            See Smile{" "}
            <span>
              <PiStarFourThin />
            </span>{" "}
            Support
            <span>
              <PiStarFourThin />
            </span>{" "}
            See Smile{" "}
            <span>
              <PiStarFourThin />
            </span>
            Support
            <span>
              <PiStarFourThin />
            </span>{" "}
            See Smile{" "}
            <span>
              <PiStarFourThin />
            </span>
          </div>
        </div>
        <div className="w-[110%] ml-[-5%] py-[1rem] bg-[#F3722C] text-white text-center rotate-[-15deg] absolute top-0 left-0 crossed-text  shadow-lg">
          <div className="flex gap-3 items-center text-scroll-effect-right">
            Support{" "}
            <span>
              <PiStarFourThin />
            </span>{" "}
            See Smile{" "}
            <span>
              <PiStarFourThin />
            </span>{" "}
            Support
            <span>
              <PiStarFourThin />
            </span>{" "}
            See Smile{" "}
            <span>
              <PiStarFourThin />
            </span>
            Support
            <span>
              <PiStarFourThin />
            </span>{" "}
            See Smile{" "}
            <span>
              <PiStarFourThin />
            </span>
            Support{" "}
            <span>
              <PiStarFourThin />
            </span>{" "}
            See Smile{" "}
            <span>
              <PiStarFourThin />
            </span>{" "}
            Support
            <span>
              <PiStarFourThin />
            </span>{" "}
            See Smile{" "}
            <span>
              <PiStarFourThin />
            </span>
            Support
            <span>
              <PiStarFourThin />
            </span>{" "}
            See Smile{" "}
            <span>
              <PiStarFourThin />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
