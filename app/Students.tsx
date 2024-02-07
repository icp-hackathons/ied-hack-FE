"use client"
import { StudentCard } from "@/components/StudentCard"
import { Divider } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import * as backend from "@/utils/backend-service"
import { StudentOutput } from "@/src/declarations/backend/backend.did"
export const Students = ({ studentArr }: { studentArr: any[] }) => {
  const [students, setStudents] = useState<StudentOutput[]>();
  const getStudents = useCallback(async () => {
    const students = await backend.getStudentBySchool(studentArr);
    setStudents(students);
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
                image={student.image}
                name={student.name}
                about={student.bio}
                level={student.level}
                cgpa={student.gpa}
              />
            )
          })
        }
      </div>
    </div>
  )
}
