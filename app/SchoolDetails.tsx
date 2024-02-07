"use client"
import React from "react"
import { SchoolPreviewImages } from "./SchoolPreviewImages"
import { FaSchool } from "react-icons/fa"
import { GoLocation } from "react-icons/go"
import { Divider } from "antd"
import { FaBitcoin } from "react-icons/fa"
import { SchoolOutput } from "@/utils/declarations/backend/backend.did"

interface props {
  school: SchoolOutput
}
export const SchoolDetails: React.FC<props> = ({ ...props }) => {

  return (
    <div className="bg-white p-4 rounded-lg md:w-[70%]">
      <div>
        <SchoolPreviewImages images={props.school.images} />
      </div>
      <div className="mt-5">
        <h3 className="font-normal text-2xl flex gap-4 items-center alegreya">
          <FaSchool className="inline text-green-light" />
          <span>{props.school.name}</span>
        </h3>
        <p className="my-2 flex gap-2 items-center text-sm">
          <GoLocation className="text-green-light" />
          <span>{props.school.location}.</span>
        </p>
        <p className="my-2 flex gap-2 items-center text-sm">
          <FaBitcoin className="text-yellow text-[20px]" />
          <span>{props.school.donations.length} donations.</span>
        </p>
        <Divider />
        <h2 className="text-xl">About The School.</h2>
        <p className="mt-4 text-[14px]">
          {props.school.description}
        </p>
      </div>
    </div>
  )
}
