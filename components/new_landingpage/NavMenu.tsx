"use client"
import Link from "next/link"
import React, { useEffect, useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import CSSRulePlugin from "gsap/CSSRulePlugin"
import { BsGithub, BsInfoCircleFill } from "react-icons/bs"

export const NavMenu = ({ active }: { active: boolean }) => {
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
  return (
    <div className="nav-overlay" ref={navRef}>
      <div className="nav-overlay-menu">
        <div className="menu-item">
          <p className="active-route">
            <Link href={""}>Home</Link>
          </p>
        </div>
        <div className="menu-item">
          <p className="">
            <Link href={""}>Schools</Link>
          </p>
        </div>
        <div className="menu-item">
          <p className="">
            <Link href={""}>TX Explorer</Link>
          </p>
        </div>
      </div>
      <div className="sub-nav grotesk" ref={subNavRef}>
        <p>
          <Link
            href={""}
            className="flex items-center gap-2 hover:underline transition-all duration-[0.3s]"
          >
            <BsGithub /> <span>Github Repository</span>
          </Link>
        </p>
        <p>
          <Link
            href={""}
            className="flex items-center gap-2 hover:underline transition-all duration-[0.3s]"
          >
            <BsInfoCircleFill /> <span>About the Hackathon</span>
          </Link>
        </p>
      </div>
    </div>
  )
}
