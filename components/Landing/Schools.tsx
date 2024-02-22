import React, { useCallback, useEffect, useState } from "react"
import { SchoolCard } from "../SchoolCard"
import * as backend from "../../utils/backend-service"
import { SchoolOutput } from "@/utils/declarations/backend/backend.did"
import { getBitcoinAddress } from "@/utils/backend-service"
import { Input } from "antd"
import { BiSearchAlt } from "react-icons/bi"
import { CiGrid41, CiBoxList } from "react-icons/ci"

export const Schools = () => {
  const [schools, setSchools] = useState<SchoolOutput[]>([])
  const [address, setAddress] = useState("")
  const getSchools = useCallback(async () => {
    const schoolData = await backend.getSchools()
    setSchools(schoolData)
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

  return (
    <div className=" md:p-[7rem] md:py-[3rem] p-[1rem]" id="schools">
      <div className="alegreya mb-[3rem] text-left">
        <h2 className="text-[3rem] font-semibold text-grey-300 leading-[3rem] special-text">
          Page Under Construction
        </h2>
        <p className="text-md md:text-lg strike">
          Donate to any school of your choice.
        </p>
      </div>
      <div className="mb-7 flex justify-between items-center gap-3">
        <Input
          className="bg-grey-800 active:bg-grey-800 hover:bg-grey-800 border-grey-700 
          active:border-grey-700 hover:border-grey-700 text-white md:w-[60%] lg:w-[40%] w-[85%] py-3"
          size="large"
          prefix={
            <span className="text-white">
              <BiSearchAlt />
            </span>
          }
          placeholder="Search for a school"
        />
        <div className="text-2xl flex items-center">
          <div className="bg-primary text-white p-3 cursor-pointer rounded-sm">
            <CiGrid41 />
          </div>
          <div className="bg-grey-600 text-white p-2 cursor-pointer rounded-sm">
            <CiBoxList />
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-7 mb-7">
        {schools.length > 0 &&
          schools.map((school: any, index: number) => {
            return <SchoolCard key={index} school={school} address={address} />
          })}
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-7">
        {schools.length > 0 &&
          schools.map((school: any, index: number) => {
            return <SchoolCard key={index} school={school} address={address} />
          })}
      </div>
    </div>
  )
}
