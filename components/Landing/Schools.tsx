import React, { useCallback, useEffect, useState } from "react"
import { SchoolCard } from "../SchoolCard"
import * as backend from "../../utils/backend-service";
export const Schools = () => {
  const [schools, setSchools] = useState<any>([]);

  const getSchools = useCallback(async () => {
    console.log("here");
    const schools = await backend.getSchools();
    setSchools(schools);
  }, []);

  useEffect(() => {
    if (!schools) {
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
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-5">

        {schools.length > 0 && schools.map((school: any, index: number) => {
          <SchoolCard
            key={index}
            image={school.images ? school.images[0] : ""}
            schoolName={school.name}
            id="1"
          />
        })}
      </div>
    </div>
  )
}
