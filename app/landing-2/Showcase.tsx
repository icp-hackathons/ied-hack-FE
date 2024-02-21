"use client"
import React from "react"
import { GiSupersonicArrow } from "react-icons/gi"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

const images = [
  {
    src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Students Success",
    subtitle:
      "Your donation directly supports initiatives aimed at enhancing educational experiences, providing necessary resources, and fostering a culture of academic excellence.",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Equality and Inclusion",
    subtitle:
      "We strive to create an inclusive environment where every student has access to opportunities regardless of their background. Your contribution helps us maintain this commitment to equity.",
  },
  {
    src: "https://images.unsplash.com/photo-1665491961263-2c9f8deebf63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2Nob29sJTIwZmFjaWxpdHl8ZW58MHx8MHx8fDA%3D",
    title: "Facility Enhancement",
    subtitle:
      "From upgrading classrooms to improving recreational areas, your donation helps create a safe, comfortable, and conducive learning environment for all.",
  },
]

const bgColors = ["#000", "#000"]

export const Showcase = () => {
  const imgRef = React.useRef<any>(null)
  const imgRef2 = React.useRef<any>(null)
  const imgRef3 = React.useRef<any>(null)

  const item = React.useRef<any>(null)

  const timeline = (target: any) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: target,
        start: "top bottom-=0", // Adjust start position as needed
        end: "bottom top", // Adjust end position as needed
        scrub: true, // Smoothly transition the animation while scrolling
        markers: false, // Display markers for debugging
        // toggleActions: "play none none none",
        // onEnter: () => updateBackground(bgColors[0]),
        // onEnterBack: () => updateBackground(bgColors[0]),
      },
    })
    tl.fromTo(
      target,
      { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        width: "100%",
        ease: "power1.out",
        duration: 2,
        toggleActions: "play none none none",
      }
    )
  }
  useGSAP(() => {
    timeline(imgRef.current)
    timeline(imgRef2.current)
    timeline(imgRef3.current)
  })
  return (
    <div className="relative z-[100] mt-[9rem] min-h-[200vh]">
      <h2 className="text-center text-2xl cursor-pointer bg-transparent">
        <Link href={"#showcase"}>
          <GiSupersonicArrow className="inline text-glow text-red-500 bg-transparent" />
        </Link>
      </h2>
      <div
        className="mt-[15rem] mb-10 items overflow-hidden px-[5rem] pb-[30rem] bg-grey-900 py-[3rem] relative"
        id="showcase"
      >
        <div className="h-full w-[1px] bg-grey-700 absolute top-0 left-[25%]" />
        <div className="h-full w-[1px] bg-grey-700 absolute top-0 left-[50%]" />
        <div className="h-full w-[1px] bg-grey-700 absolute top-0 left-[75%]" />
        {/* <div className="w-full h-[1px] bg-grey-700 absolute top-[25%] left-[0%]" />
        <div className="w-full h-[1px] bg-grey-700 absolute top-[50%] left-[0%]" />
        <div className="w-full h-[1px] bg-grey-700 absolute top-[75%] left-[0%]" /> */}

        <h2 className="text-center text-5xl mb-10 grotesk">
          Why <span className="text-[#fd366e] underline">Donate?</span>
        </h2>
        <div className="relative item overflow-hidden bg-transparent mb-10">
          <div className="item-img overflow-hidden w-[50rem]">
            <div className="relative w-full h-[600px] bg-grey-800 shadow-md">
              <Image
                src={images[0].src}
                alt={images[0].title}
                className="object-cover rounded-sm"
                fill
                ref={imgRef}
                style={{ filter: "grayscale(70%)" }}
              />
            </div>
            <div className="text-white -mt-[5rem] z-10 relative px-10">
              <h2 className="text-[5rem] font-semibold">
                <span className="special-text">Students</span>{" "}
                <span className="text-[#fd366e] underline">Success</span>
              </h2>
              <p className="text-[18px] grotesk">{images[0].subtitle}</p>
            </div>
          </div>
        </div>

        <div className="relative item overflow-hidden bg-transparent flex justify-center items-center flex-col gap-3 w-full mb-10">
          <div className="item-img overflow-hidden w-[50rem]">
            <div className="relative w-full h-[600px] bg-grey-800 shadow-md">
              <Image
                src={images[1].src}
                alt={images[1].title}
                className="object-cover rounded-sm"
                fill
                ref={imgRef2}
                style={{ filter: "grayscale(70%)" }}
              />
            </div>
            <div className="text-white -mt-[5rem] z-10 relative px-10">
              <h2 className="text-[4rem] font-semibold">
                <span className="special-text">Equality and</span>{" "}
                <span className="text-[#957FEF] underline">Inclusion</span>
              </h2>
              <p className="text-[18px] grotesk">{images[1].subtitle}</p>
            </div>
          </div>
        </div>

        <div className="relative item overflow-hidden bg-transparent flex justify-end items-end flex-col gap-3 w-full">
          <div className="item-img overflow-hidden w-[50rem]">
            <div className="relative w-full h-[600px] bg-grey-800 shadow-md">
              <Image
                src={images[2].src}
                alt={images[2].title}
                className="object-cover rounded-sm"
                fill
                ref={imgRef3}
                style={{ filter: "grayscale(70%)" }}
              />
            </div>
            <div className="text-white -mt-[5rem] z-10 relative px-10">
              <h2 className="text-[4rem] font-semibold">
                <span className="special-text">Facility </span>{" "}
                <span className="text-[#fd366e] underline">Enhancement</span>
              </h2>
              <p className="text-[18px] grotesk">{images[2].subtitle}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-10 relative">
          <Link
            href={""}
            className="bg-[#fd366e] text-grey-100 py-3 px-7 rounded-md glow"
          >
            View Schools
          </Link>
        </div>
      </div>
    </div>
  )
}
