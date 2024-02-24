"use client"
import Link from "next/link"
import React, { useEffect, useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import CSSRulePlugin from "gsap/CSSRulePlugin"
import { BsGithub, BsInfoCircleFill } from "react-icons/bs"
import { usePathname } from "next/navigation"

export const NavMenu = ({
  active,
  setOpen,
}: {
  active: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  // const activeItemIndicator = CSSRulePlugin.getRule(
  //   ".menu-item .acive-route::after"
  // )
  const navRef = React.useRef(null)
  const subNavRef = React.useRef(null)
  const timeline = useRef<any>()

  useGSAP(() => {
    gsap.set(".menu-item p", { y: 225 })
    timeline.current = gsap.timeline({ paused: true })
    timeline.current.to(navRef.current, {
      duration: 1.6,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      ease: "power4.inOut",
    })
    timeline.current.to(
      ".menu-item p",
      { duration: 1.5, y: 0, stagger: 0.2, ease: "power4.out" },
      "-=1"
    )
    // timeline.current.to(
    //   activeItemIndicator,
    //   {
    //     width: "100%",
    //     duration: 1,
    //     ease: "power4.out",
    //     delay: 0.5,
    //   },
    //   "<"
    // )
    timeline.current.to(
      subNavRef.current,
      { duration: 1, bottom: "10%", opacity: 1, delay: 0.5 },
      "<"
    )
  })
  useGSAP(() => {
    if (active) {
      timeline.current.play()
    } else {
      timeline.current.reverse()
    }
  }, [active])
  const pathname = usePathname()
  const isActive = (path: string) => {
    if (pathname === path) return "active-route"
    else return ""
  }
  return (
    <div className="nav-overlay" ref={navRef}>
      <div className="nav-overlay-menu">
        <div className="menu-item">
          <p className={isActive("/")}>
            <Link href={"/"}>Home</Link>
          </p>
        </div>
        <div className="menu-item">
          <p className={isActive("/schools")}>
            <Link
              href={"/schools"}
              onClick={setOpen ? () => setOpen(false) : () => ""}
            >
              Schools
            </Link>
          </p>
        </div>
        <div className="menu-item">
          <p className={isActive("/tx-explorer")}>
            <Link href={"/tx-explorer"}>
              {" "}
              T<span className="lowercase">x</span> Explorer
            </Link>
          </p>
        </div>
      </div>
      <div
        className="sub-nav grotesk md:text-lg text-sm md:flex-row flex-col items-center"
        ref={subNavRef}
      >
        <p>
          <Link
            href={"https://github.com/osas2211/ied-hack-FE"}
            className="flex items-center gap-2 hover:underline transition-all duration-[0.3s]"
            target="_blank"
          >
            <BsGithub /> <span>Github Repository</span>
          </Link>
        </p>
        <p>
          <Link
            href={
              "https://summit.immersiveeducation.org/SouthAfrica/2024/hackathon.html"
            }
            className="flex items-center gap-2 hover:underline transition-all duration-[0.3s]"
            target="_blank"
          >
            <BsInfoCircleFill /> <span>About the Hackathon</span>
          </Link>
        </p>
      </div>
    </div>
  )
}
