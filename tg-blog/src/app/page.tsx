/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link'
import MenuBar from './menubar';
import { Meteors } from '@/components/ui/meteors';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/components/ui/data-table.d';
import { Boxes } from '@/components/ui/background-boxes';
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

function MeteorCard(props: any){
  return (
    <div className="mt-10">
      <div className=" w-[275px] sm:w-[375px] md:w-[450px] lg:w-[500px] relative max-w-xs">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
          <div className="relative shadow-xl bg-gray-100 dark:bg-gray-900 border border-gray-50 dark:border-gray-800  px-4 py-5 h-full overflow-hidden rounded-xl flex flex-col justify-end items-start">
  
            <h2 className="font-extrabold text-xl pb-5">{props.title}</h2>

  
            <p className="font-normal text-xs text-slate-800 dark:text-slate-300 mb-4 relative z-50">
              {props.desc}
            </p>
  
            <button className="border px-3 py-1 rounded-lg  border-gray-500 text-slate-700 dark:text-gray-300 text-xs hover:bg-slate-700">
              tru 👍
            </button>
  
            {/* Meaty part - Meteor effect */}
            <Meteors number={20} />
          </div>
      </div>
    </div>
  )
}

export default async function Home() {
  try{
    const res = await fetch("https://api.github.com/repos/timgerstel/timgerstel.github.io/git/trees/master?recursive=1")
    const json = await res.json();
    const postUrl = json.tree.filter((item: any) => item.path === "posts")[0].url;
    const postsRes = await fetch(postUrl);
    const postsJson = await postsRes.json();
    const posts = postsJson.tree;
    const postTitles = posts.map((item: any) => item.path);

    return (
      <div className="tg-app-main-container w-full font-(family-name:--Inter)">
        <MenuBar />
        <main className="flex flex-col items-center
        h-[calc(100vh)]
        ml-5 md:ml-10
        mr-5 md:mr-10
        border-l border-r border-dashed border-[rgba(0,132,255,0.1)]
        overflow-hidden z-10">
          <div className="w-full 
            pl-5 md:pl-10
            pr-5 md:pr-10
          absolute flex flex-col items-center overflow-hidden z-30">
            <DataTable columns={columns} data={postTitles.map((post: any, ind: any) => {
              const parts = post.split("---");
              return {id: ind, title: parts[1], desc: parts[2], date: parts[0], url: encodeURIComponent(post)}
            })}/>
          </div>

          <div className="h-[1200px] md:h-[700px] absolute w-full top-[650px]
            overflow-hidden">
              <div className="dark:bg-[rgba(0,0,0,0.03)]
              h-[1200px] md:h-[700px]
              ml-5 md:ml-10
              mr-5 md:mr-10
              bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex flex-col items-center justify-center -z-10" />
            <div className="absolute inset-0 w-full
            h-full dark:bg-[rgba(0,0,0,0.03)] bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />
      
            {/* <Boxes className="sm:hidden md:hidden lg:hidden xl:hidden 2xl:flex"/> */}
          </div>
          
          <div className="flex flex-col items-center absolute top-[750px]">
            <h1 className="text-3xl font-extrabold -z-10">Loved by peers.</h1>
            <div className="flex flex-col sm:flex-row">
              <div className="flex flex-col py-5 px-5">
                <MeteorCard title="Architect" desc="Did someone gave Stevie Wonder a regular computer keyboard?" />
                <MeteorCard title="Test Engineer" desc="Idt he knows what a unit test is lmao." />
              </div>
              <div className="flex flex-col px-5">
                <MeteorCard title="Manager" desc="this guy sucks" />
                <MeteorCard title="Scrum Master" desc="It's a miracle he remembers to breathe, honestly." />
              </div>
            </div>
          </div>

          
        </main>
      </div>
    );
  } catch(e) {
    console.log('error', e);
    return (
      <div className="tg-app-main-container w-full font-(family-name:--Inter)">
        <MenuBar />
        <main className="flex flex-col justify-center
        h-[calc(100vh-50px)]
        ml-5 md:ml-10
        mr-5 md:mr-10
        border-l border-r border-dashed border-[rgba(0,132,255,0.1)]
        overflow-scroll">
          <div className="flex animate-pulse space-x-4 py-5">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                  <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                </div>
                <div className="h-2 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>

          <div className="flex animate-pulse space-x-4 py-5">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                  <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                </div>
                <div className="h-2 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>

          <div className="flex animate-pulse space-x-4 py-5">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                  <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                </div>
                <div className="h-2 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}
