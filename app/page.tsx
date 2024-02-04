import { Logo } from "@/components/Logo"
import Image from "next/image"

export default function Home() {
  return (
    <main>
      <div className="flex lg:h-[100vh]">
        <div className="w-[25%] bg-yellow h-full lg:p-[40px] md:p-[24px] p-[1rem]">
          <Logo />
        </div>
        <div className="w-[75%] bg-green h-full lg:p-[40px] md:p-[24px] p-[1rem] relative">
          {/* <Logo /> */}
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.4]">
            <Image src="/patterns.png" alt="IED Hackathon" fill />
          </div>
        </div>
      </div>
    </main>
  )
}
