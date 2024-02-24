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
    const distanceFromCenter = Math.abs(window.innerWidth / 2 - centerPosition)

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
  maxScroll = sliderWrapper.clientWidth - window.innerWidth
})

window.addEventListener("wheel", (e) => {
  target += e.deltaY
  target = Math.max(0, target)
  target = Math.min(maxScroll, target)
})

update()
