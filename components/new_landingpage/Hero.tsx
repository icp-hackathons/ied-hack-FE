import React from "react"
import { Header } from "./Header"
import { FaBolt } from "react-icons/fa"
import { LuRocket } from "react-icons/lu"
import { MdSchool } from "react-icons/md"
import Link from "next/link"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"

export const Hero = () => {
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
    gsap.fromTo(
      ".reveal-text2",
      {
        y: 500,
        stagger: {
          amount: 0.2,
        },
      },
      { y: 0, duration: 1.8, delay: 3.7, ease: "bounce.out" }
    )
  })

  return (
    <div className="relative bg-transparent">
      <Header />
      <h2 className="text-grey-100 mt-[10rem] text-center w-[70%] m-auto z-[100] relative  overflow-hidden">
        <div className="grotesk md:text-[7rem] md:leading-[6.8rem] text-[3.7rem] leading-[4rem] font-semibold reveal-text2">
          <p>
            Changing lives f
            <span className="relative">
              o
              <span className="absolute md:top-[1rem] top-[0.1rem] right-[-10px]">
                <MdSchool className="md:text-[32px] text-[24px] text-[#04E762]" />
              </span>
            </span>
            r <span className="text-[#fd366e] underline">the </span>
          </p>
          <p>
            <span className="text-[#fd366e] underline">better,</span> o
            <span className="relative">
              n
              <span className="absolute md:top-[1.4rem] top-[0.9rem] right-[-15px]">
                <FaBolt className="md:text-[32px] text-[24px] text-yellow" />
              </span>
            </span>
            e donation at
          </p>
          <p>
            a tim
            <span className="relative">
              e
              <span className="absolute md:top-[1.5rem] top-[0.9rem] right-[-30px]">
                <LuRocket className="md:text-[32px] text-[24px] text-[#FB6107]" />
              </span>
            </span>
            .
          </p>
        </div>
      </h2>
      <p className="text-center md:w-[50rem] mx-auto mt-5 mb-10 text-lg text-grey-300 relative z-[100] reveal-text">
        Your Financial contribution can make a real difference. Every penny you
        donate goes into making the school and student life better.
      </p>

      <div className="flex justify-center gap-4 reveal-text">
        <Link
          href={""}
          className="bg-grey-900 text-grey-100 py-3 px-7 rounded-md border-[1px] border-[#fd366e]"
        >
          Tx Explorer
        </Link>
        <Link
          href={""}
          className="bg-[#fd366e] text-grey-100 py-3 px-7 rounded-md btn-glow"
        >
          Schools
        </Link>
      </div>
      <div className="absolute bottom-[-45rem] left-[-20%] w-[70rem] h-[60rem] z-[0] reveal-text">
        <Image src={"/abs-1.png"} fill alt="IED Hackathon" />
      </div>
      <div className="absolute bottom-[-25rem] right-[-30%] w-[70rem] h-[60rem] z-[0] reveal-text">
        <Image src={"/abs-2.png"} fill alt="IED Hackathon" />
      </div>
    </div>
  )
}
