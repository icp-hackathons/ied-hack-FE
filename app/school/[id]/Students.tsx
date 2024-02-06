"use client"
import { StudentCard } from "@/components/StudentCard"
import { Divider } from "antd"
import React from "react"

export const Students = () => {
  return (
    <div className="bg-white p-3 pb-[2rem] rounded-md my-4">
      <h3 className="text-2xl">Students</h3>
      <Divider orientation="left">
        You can make donations to students in the school.
      </Divider>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-7 md:px-10 mt-3">
        <StudentCard
          image="https://images.unsplash.com/photo-1671726203454-5d7a5370a9f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          name="John Doe"
          about="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, cumque."
          level="400 level"
          cgpa="4.44"
        />
        <StudentCard
          image="https://images.unsplash.com/photo-1517256673644-36ad11246d21?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          name="Christina Hughes"
          about="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, cumque."
          level="100 level"
          cgpa="4.22"
        />
        <StudentCard
          image="https://images.unsplash.com/photo-1529470839332-78ad660a6a82?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          name="Emily Miller"
          about="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, cumque."
          level="300 level"
          cgpa="4.75"
        />
        <StudentCard
          image="https://images.unsplash.com/photo-1545696968-1a5245650b36?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          name="Ryan Raynolds"
          about="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, cumque."
          level="200 level"
          cgpa="4.63"
        />
        <StudentCard
          image="https://images.unsplash.com/photo-1522010265321-fd346cc64d80?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          name="Fatima Cardova"
          about="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, cumque."
          level="500 level"
          cgpa="4.97"
        />
      </div>
    </div>
  )
}
