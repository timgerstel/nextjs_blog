import Link from "next/link";

export default function MenuBar(){
  return (<div className="w-full h-[50px] border-b border-dashed border-[rgb(0,0,0,0.2)]">
    <div className="flex items-center gap-2 sm:gap-3 md:gap-5 lg:gap-10
      whitespace-nowrap
      h-full
      ml-10 sm:ml-20 md:ml-30 lg:ml-40
      mr-10 sm:mr-20 md:mr-30 lg:mr-40
      pl-5 md:pl-10 pr-5 md:pr-10
      border-l border-r border-dashed border-[rgb(0,0,0,0.2)]
    font-bold">
      <Link href="/">Timothy Gerstel</Link>
      <a href="https://github.com/timgerstel">GitHub</a>
      <a href="https://www.linkedin.com/in/timgerstel/">LinkedIn</a>
    </div>
  </div>)
}