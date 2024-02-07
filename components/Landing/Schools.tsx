import React, { useCallback, useEffect, useState } from "react"
import { SchoolCard } from "../SchoolCard"
import * as backend from "../../utils/backend-service"
export const Schools = () => {
  const [schools, setSchools] = useState<any>([])

  const getSchools = useCallback(async () => {
    console.log("here")
    const schools = await backend.getSchools()
    setSchools(schools)
  }, [])

  useEffect(() => {
    if (!schools) {
      getSchools()
    }
  }, [schools, getSchools])

  return (
    <div className=" md:p-[3rem] p-[1rem]" id="schools">
      <div className="alegreya mb-[2rem]">
        <h2 className="text-[3rem] font-semibold text-grey-600 leading-[3rem]">
          All Schools
        </h2>
        <p className="text-md md:text-lg">
          Donate to any school of your choice.
        </p>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-5">
        {/* {schools.length > 0 &&
          schools.map((school: any, index: number) => {
            return (
              <SchoolCard
                key={index}
                image={school.images ? school.images[0] : ""}
                schoolName={school.name}
                id={`${index}`}
              />
            )
          })} */}
        <SchoolCard
          image="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          schoolName="Motherfield College"
          id="1"
        />
      </div>
    </div>
  )
}
