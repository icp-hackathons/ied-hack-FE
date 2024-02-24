"use client"
import "../app/students.css"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { SchoolOutput } from "@/src/declarations/backend/backend.did"
import React, { useCallback, useEffect, useState } from "react"
import * as backend from "@/utils/backend-service"
import { StudentOutput } from "@/src/declarations/backend/backend.did"
import { StudentCardAlt } from "./StudentCardAlt"

export const Students = ({
  school,
  address,
  open,
}: {
  school: SchoolOutput
  address: string
  open: boolean
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
      <p className="students_logo text-lg grotesk">{school.name} Students.</p>
      <div className="students_sidebar">
        <div className="students_sidebar-item grotesk">
          <p id="students_header" className="urbanist">
            the <br />
            future
          </p>
          <p className="text-lg">
            Hover the images <br />
            (For Details)
          </p>
        </div>
        <div className="students_sidebar-item">
          <p>/Potential</p>
          <p>Do Better. Be Better.</p>
        </div>
      </div>

      <div className="students_slider">
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
    </div>
  )
}
