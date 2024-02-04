import { Left } from "@/components/Landing/Left"
import { Right } from "@/components/Landing/Right"

export default function Home() {
  return (
    <main>
      <div className="flex lg:h-[100vh] flex-col-reverse md:flex-row">
        <Left />
        <Right />
      </div>
    </main>
  )
}
