"use client"

import Switcher13 from "@/components/ui/switcher13";
import Link from "next/link";

export default function MenuBar(){
  

  return (<div className="w-full h-[50px] border-b border-dashed border-[rgba(0,132,255,0.1)] sticky top-0 z-50">
    <div className="flex items-center gap-2 md:gap-3
      whitespace-nowrap
      h-full
      ml-5 md:ml-10
      mr-5 md:mr-10
      pl-3 pr-3
      border-l border-r border-dashed border-[rgba(0,132,255,0.1)]
    font-bold">
      <Link href="/">Timothy Gerstel</Link>
      <a href="https://github.com/timgerstel">GitHub</a>
      <a href="https://www.linkedin.com/in/timgerstel/">LinkedIn</a>
      <div className="ml-auto">
        <Switcher13 />
      </div>
    </div>
  </div>)
}