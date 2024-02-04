import React from "react"
import { Logo } from "../Logo"
import { LiaDonateSolid } from "react-icons/lia"
import { BsFillArrowRightCircleFill } from "react-icons/bs"
import { FaWpexplorer } from "react-icons/fa"
import { PiStarFourThin } from "react-icons/pi"

import Link from "next/link"

export const Left = () => {
  return (
    <div className="md:w-[25%] bg-yellow h-full overflow-hidden">
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
              href={"/donate"}
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
              href={"/donate"}
              className="font-semibold flex gap-2 items-center cursor-pointer hover:underline"
            >
              <span>Transactions Explorer</span>
              <BsFillArrowRightCircleFill className="text-lg" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-[5rem] relative h-[10rem]">
        <div className="w-[110%] ml-[-5%] py-[1rem] bg-black text-white text-center rotate-[15deg] absolute top-0 left-0 crossed-text  ">
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
        <div className="w-[110%] ml-[-5%] py-[1rem] bg-[#F3722C] text-white text-center rotate-[-15deg] absolute top-0 left-0 crossed-text  ">
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
