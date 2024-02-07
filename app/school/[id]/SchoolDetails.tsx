"use client"
import React from "react"
import { SchoolPreviewImages } from "./SchoolPreviewImages"
import { FaSchool } from "react-icons/fa"
import { GoLocation } from "react-icons/go"
import { Divider } from "antd"
import { FaBitcoin } from "react-icons/fa"

export const SchoolDetails = () => {
  return (
    <div className="bg-white p-4 rounded-lg md:w-[70%]">
      <div>
        <SchoolPreviewImages />
      </div>
      <div className="mt-5">
        <h3 className="font-normal text-2xl flex gap-4 items-center alegreya">
          <FaSchool className="inline text-green-light" />
          <span>University of New Chelsea.</span>
        </h3>
        {/* <p className="my-2 flex gap-2 items-center text-sm">
          <GoLocation className="text-green-light" />
          <span>Fulham Road SW6 1HS London (Residents: 8.908.081).</span>
        </p>
        <p className="my-2 flex gap-2 items-center text-sm">
          <FaBitcoin className="text-yellow text-[20px]" />
          <span>20k donations.</span>
        </p> */}
        <Divider />
        <h2 className="text-xl">About The School.</h2>
        <p className="mt-4 text-[14px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
          molestiae maiores fugit doloribus nemo deleniti voluptates ab nostrum
          earum odit inventore sed, quod beatae corrupti, accusantium nihil
          veniam suscipit a impedit vitae eveniet fuga ducimus dolore.
          Praesentium labore nihil libero cumque sunt voluptatibus officiis
          fugit, aperiam nulla dolorum eligendi reiciendis culpa placeat ipsam
          earum corporis facere quos, doloremque suscipit porro. Itaque iste,
          possimus rem, officia vitae voluptas quas magnam iure tenetur
          obcaecati dolore error voluptate inventore aperiam molestiae in
          nesciunt sunt quos, neque ipsa culpa commodi? Libero dicta saepe
          soluta molestiae reiciendis inventore mollitia, tenetur aliquam aut,
          tempore animi sed.
        </p>
      </div>
    </div>
  )
}
