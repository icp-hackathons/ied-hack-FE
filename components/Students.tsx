"use client"
import "../app/students.css"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { SchoolOutput } from "@/src/declarations/backend/backend.did"
import React, { useCallback, useEffect, useState } from "react"
import * as backend from "@/utils/backend-service"
import { StudentOutput } from "@/src/declarations/backend/backend.did"
import Image from "next/legacy/image"

export const Students = ({ school }: { school: SchoolOutput }) => {
  const [students, setStudents] = useState<StudentOutput[]>()
  const getStudents = useCallback(async () => {
    const students = await backend.getStudentBySchool(school.students)
    setStudents(students)
  }, [school.students])

  useEffect(() => {
    if (!students) {
      getStudents()
    }
  }, [students, getStudents])
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

    let maxScroll = sliderWrapper?.clientWidth - window.innerWidth
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

      gsap.set(".students_slider-wrapper", {
        x: -current,
      })
      updateScaleAndPosition()
      requestAnimationFrame(update)
    }

    window.addEventListener("resize", () => {
      maxScroll = sliderWrapper?.clientWidth - window.innerWidth
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
      <p className="students_logo">{school.name} Students.</p>
      <div className="students_sidebar">
        <div className="students_sidebar-item">
          <p id="students_header">
            the <br />
            future
          </p>
          <p>
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
        <div className="students_slider-wrapper">
          {students?.map((student, index) => {
            return (
              <div key={index} className="students_slide">
                <Image
                  src={student.image}
                  layout="fill"
                  alt={student.name}
                  className="rounded-[10px]"
                  objectFit="cover"
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
