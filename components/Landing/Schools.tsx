import React from "react"
import { SchoolCard } from "../SchoolCard"

export const Schools = () => {
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
        <SchoolCard
          image="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          schoolName="Motherfield College"
          id="1"
        />
        <SchoolCard
          image="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          schoolName="University of Benin"
          id="1"
        />
        <SchoolCard
          image="https://images.unsplash.com/photo-1558021211-6d1403321394?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          schoolName="Harvard University"
          id="1"
        />
        <SchoolCard
          image="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          schoolName="Beacon Hill School"
          id="1"
        />
        <SchoolCard
          image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          schoolName="Beverly Hills High School"
          id="1"
        />
        <SchoolCard
          image="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          schoolName="University of Benin"
          id="1"
        />
        <SchoolCard
          image="https://images.unsplash.com/photo-1558021211-6d1403321394?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          schoolName="Harvard University"
          id="1"
        />
        <SchoolCard
          image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          schoolName="Beverly Hills High School"
          id="1"
        />
        <SchoolCard
          image="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          schoolName="Motherfield College"
          id="1"
        />

        <SchoolCard
          image="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          schoolName="Beacon Hill School"
          id="1"
        />
      </div>
    </div>
  )
}
