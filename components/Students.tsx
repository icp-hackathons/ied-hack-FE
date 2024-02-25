"use client"
import "../app/students.css"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { SchoolOutput } from "@/src/declarations/backend/backend.did"
import React, { useCallback, useEffect, useState } from "react"
import * as backend from "@/utils/backend-service"
import { StudentOutput } from "@/src/declarations/backend/backend.did"
import { StudentCardAlt } from "./StudentCardAlt"
import { BiArrowBack } from "react-icons/bi"
import { FaCircleInfo } from "react-icons/fa6"

export const Students = ({
  school,
  address,
  open,
  showStudents,
  setShowStudents,
}: {
  school: SchoolOutput
  address: string
  open: boolean
  showStudents: boolean
  setShowStudents: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [students, setStudents] = useState<StudentOutput[]>()
  const wrapperRef = React.useRef<any>(null)
  const getStudents = useCallback(async () => {
    const students = await backend.getStudentBySchool(school.students)
    setStudents(students)
  }, [school])

  useEffect(() => {
    if (!students) {
      getStudents()
    }
  }, [students, getStudents, open])
  useGSAP(() => {
    let target = 0
    let current = 0
    let ease = 0.75

    const slider = document.querySelector(".students_slider") as Element
    const sliderWrapper = document.querySelector(
      ".students_slider-wrapper"
    ) as Element
    const slides = document.querySelectorAll(
      ".students_slide"
    ) as NodeListOf<Element>

    let maxScroll = wrapperRef.current?.clientWidth - window.innerWidth
    function lerp(start: number, end: number, factor: number) {
      return start + (end - start) * factor
    }

    function updateScaleAndPosition() {
      slides.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect()
        const centerPosition = (rect.left + rect.right) / 2
        const distanceFromCenter = Math.abs(
          window.innerWidth / 2 - centerPosition
        )

        let scale, offsetX
        if (distanceFromCenter > 0) {
          scale = Math.min(1.75, 1 + distanceFromCenter / window.innerWidth)
          offsetX = (scale - 1) * 300
        } else {
          scale = Math.max(
            0.5,
            1 - Math.abs(distanceFromCenter) / window.innerWidth
          )
        }

        gsap.set(slide, {
          scale: scale,
          x: offsetX,
        })
      })
    }
    function update() {
      current = lerp(current, target, ease)

      gsap.set(wrapperRef.current, {
        x: -current,
      })
      updateScaleAndPosition()
      requestAnimationFrame(update)
    }

    window.addEventListener("resize", () => {
      maxScroll = wrapperRef.current?.clientWidth - window.innerWidth
    })

    window.addEventListener("wheel", (e) => {
      target += e.deltaY
      target = Math.max(0, target)
      target = Math.min(maxScroll, target)
    })

    update()
  }, [students])

  return (
    <div className="relative min-h-[100vh]">
      <div
        className="inline-flex gap-3 items-center px-[2rem] py-5 md:pt-10 cursor-pointer text-primary relative z-[50] hover:underline"
        onClick={() => setShowStudents(false)}
      >
        <BiArrowBack />
        <span>Go back</span>
      </div>
      <p className="students_logo md:text-3xl text-2xl grotesk -mt-5">
        {school.name} Students.
      </p>
      <p className="px-[2rem] -mt-3 capitalize font-bold text-grey-300 md:flex gap-2 items-center hidden">
        <FaCircleInfo className="text-primary" />
        <span>hover the images to see students details or donate.</span>
      </p>
      <div className="students_sidebar px-[3em] md:py-[1.5em] py-[0.1em] ">
        <div className="students_sidebar-item grotesk">
          <p id="students_header" className="urbanist">
            the <br />
            future
          </p>
          <p className="text-lg md:block hidden">
            Hover the images <br />
            (For Details)
          </p>
        </div>
        <div className="students_sidebar-item">
          <p>/Potential</p>
          <p>Do Better. Be Better.</p>
        </div>
      </div>

      <div className="hidden md:block students_slider">
        <div className="students_slider-wrapper" ref={wrapperRef}>
          {students?.map((student, index) => {
            return (
              <StudentCardAlt
                key={index}
                id={student.id}
                image={student.image}
                name={student.name}
                about={student.bio}
                level={student.level}
                cgpa={student.gpa}
                address={address}
              />
            )
          })}
        </div>
      </div>

      <div className="block md:hidden pl-[1.8em] pr-[1.2em] mt-[2rem]">
        <div>
          {students?.map((student, index) => {
            return (
              <StudentCardAlt
                key={index}
                id={student.id}
                image={student.image}
                name={student.name}
                about={student.bio}
                level={student.level}
                cgpa={student.gpa}
                address={address}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
