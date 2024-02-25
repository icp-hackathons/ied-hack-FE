import React, { useCallback, useEffect, useRef, useState } from "react"
import { SchoolCard } from "./SchoolCard"
import * as backend from "../utils/backend-service"
import { SchoolOutput } from "@/utils/declarations/backend/backend.did"
import { getBitcoinAddress } from "@/utils/backend-service"
import { Empty, Input } from "antd"
import { BiSearchAlt } from "react-icons/bi"
import { CiGrid41, CiBoxList, CiLocationOn } from "react-icons/ci"
import Image from "next/image"
import { FaBitcoin } from "react-icons/fa"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { SchoolCardAlt } from "./SchoolCardAlt"

export const Schools = () => {
  const [gettingSchools, setGettingSchools] = useState(false)
  const [schools, setSchools] = useState<SchoolOutput[]>([])
  const [mutableSchools, setMutableSchools] = useState<SchoolOutput[]>([])
  const [address, setAddress] = useState("")
  const [searchValue, setSearchValue] = useState("")

  const getSchools = useCallback(async () => {
    setGettingSchools(true)
    console.log("here")
    const schoolData = await backend.getSchools()
    setSchools(schoolData)
    setMutableSchools(schoolData)
    setGettingSchools(false)
  }, [])

  const getAddress = useCallback(async () => {
    const address = await getBitcoinAddress()
    setAddress(address)
  }, [])

  useEffect(() => {
    if (schools.length == 0) {
      getSchools()
      getAddress()
    }
  }, [schools, getSchools, getAddress])
  const [showGrid, setShowGrid] = useState(true)

  const timeline = useRef<any>(null)
  const viewRef = useRef<any>(null)

  timeline.current = gsap.timeline({ paused: true })

  useGSAP(() => {
    gsap.set(viewRef.current, { y: 100 })
    timeline.current.to(viewRef.current, {
      y: 0,
      duration: 1.5,
      ease: "power4.out",
    })
  })
  useGSAP(() => {
    if (showGrid === false) {
      timeline.current.play()
    } else {
      timeline.current.reverse()
    }
  }, [showGrid])

  return (
    <div className=" md:p-[7rem] md:py-[3rem] p-[1rem]" id="schools">
      <div className="grotesk mb-[3rem] text-left">
        <h2 className="text-[3rem] font-semibold text-grey-300 leading-[3rem] special-text">
          Schools.
        </h2>
        <p className="text-md md:text-lg strike">
          Donate to any school of your choice.
        </p>
      </div>
      <div className="mb-10 flex justify-between items-center gap-3">
        <Input
          className="bg-grey-800 active:bg-grey-800 hover:bg-grey-800 border-grey-700 
          active:border-grey-700 hover:border-grey-700 text-white md:w-[60%] lg:w-[40%] w-[80%] py-3"
          size="large"
          prefix={
            <span className="text-white">
              <BiSearchAlt />
            </span>
          }
          placeholder="Search for a school"
          onChange={(e) => {
            const currValue = e.target.value
            setSearchValue(currValue)
            const filteredData = schools.filter((entry) =>
              entry.name.toLowerCase().includes(currValue.toLowerCase())
            )
            setMutableSchools(filteredData)
          }}
        />
        <div className="text-2xl flex items-center">
          <div
            className={`${showGrid ? "bg-primary" : "bg-grey-600"} text-white ${
              showGrid ? "p-3" : "p-2"
            } cursor-pointer rounded-sm`}
            onClick={() => setShowGrid(true)}
          >
            <CiGrid41 />
          </div>
          <div
            className={`${
              !showGrid ? "bg-primary" : "bg-grey-600"
            } text-white ${
              !showGrid ? "p-3" : "p-2"
            } cursor-pointer rounded-sm`}
            onClick={() => setShowGrid(false)}
          >
            <CiBoxList />
          </div>
        </div>
      </div>
      {gettingSchools ? (
        <p>Loading Schools...</p>
      ) : (
        <>
          {showGrid && (
            <>
              {mutableSchools.length > 0 ? (
                <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-7 mb-7">
                  {mutableSchools.map((school: any, index: number) => {
                    return (
                      <SchoolCard
                        key={index}
                        school={school}
                        address={address}
                      />
                    )
                  })}
                </div>
              ) : (
                <div className="mb-[15rem]">
                  <Empty
                    description={false}
                    image={
                      <div className="flex justify-center items-center flex-col gap-1">
                        <div className="h-[200px] w-[200px] relative">
                          <Image src={"/not-found.png"} alt="Empty" fill />
                        </div>
                        <p>No School Found</p>
                      </div>
                    }
                  />
                </div>
              )}
            </>
          )}

          {!showGrid && (
            <div
              className="grid lg:grid-cols-1 md:grid-cols-1 gap-7 mb-[7rem] list-view"
              ref={viewRef}
            >
              {mutableSchools.length > 0 ? (
                mutableSchools.map((school: SchoolOutput, index: number) => {
                  return (
                    <>
                      <SchoolCardAlt
                        key={index}
                        school={school}
                        address={address}
                        index={index}
                      />
                    </>
                  )
                })
              ) : (
                <div className="mb-[8rem]">
                  <Empty
                    description={false}
                    image={
                      <div className="flex justify-center items-center flex-col gap-1">
                        <div className="h-[200px] w-[200px] relative">
                          <Image src={"/not-found.png"} alt="Empty" fill />
                        </div>
                        <p>No School Found</p>
                      </div>
                    }
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
