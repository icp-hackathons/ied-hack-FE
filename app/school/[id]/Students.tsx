"use client"
import { StudentCard } from "@/components/StudentCard"
import { Divider } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import * as backend from "@/utils/backend-service"
import { Student } from "@/src/declarations/backend/backend.did"
export const Students = ({ studentArr }: { studentArr: any[] }) => {

  const [students, setStudents] = useState<([] | [Student])[]>();

  const getStudents = useCallback(async () => {
    const students = await backend.getStudentBySchool(studentArr);
    setStudents(students)
  }, [studentArr]);

  useEffect(() => {
    if (!students) {
      getStudents();
    }
  }, [students, getStudents])

  return (
    <div className="bg-white p-3 pb-[2rem] rounded-md my-4">
      <h3 className="text-2xl">Students</h3>
      <Divider orientation="left">
        You can make donations to students in the school.
      </Divider>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-7 md:px-10 mt-3">
        {
          students && students.map((student, index) => {
            return (
              <StudentCard
                key={index}
                image="https://images.unsplash.com/photo-1671726203454-5d7a5370a9f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                name="John Doe"
                about="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, cumque."
                level="400 level"
                cgpa="4.44"
              />
            )
          })
        }
      </div>
    </div>
  )
}
