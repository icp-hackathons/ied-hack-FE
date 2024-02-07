import React, { useCallback, useEffect, useState } from "react"
import { SchoolCard } from "../SchoolCard"
import * as backend from "../../utils/backend-service";
import { SchoolOutput } from "@/utils/declarations/backend/backend.did";
export const Schools = () => {
  const [schools, setSchools] = useState<SchoolOutput[]>([]);
  const getSchools = useCallback(async () => {
    const schoolData = await backend.getSchools();
    setSchools(schoolData);
  }, []);

  useEffect(() => {
    if (schools.length == 0) {
      getSchools();
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
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5">
        {schools.length > 0 &&
          schools.map((school: any, index: number) => {
            return (
              <SchoolCard
                key={index}
                school={school}
              />
            )
          })}
      </div>
    </div>
  )
}
