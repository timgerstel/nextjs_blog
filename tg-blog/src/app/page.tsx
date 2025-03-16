/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link'
import MenuBar from './menubar';
import { Meteors } from '@/components/ui/meteors';

function BlogPost(props: any){
  return (
    <Link href={`/post/${props.url}`}>
      <div className="mt-10">
      <div className=" w-[275px] sm:w-[375px] md:w-[450px] lg:w-[500px] relative max-w-xs">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-5 h-full overflow-hidden rounded-xl flex flex-col justify-end items-start">
          {/* <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div> */}
 
          <div className="font-bold text-xs text-white w-full flex justify-between whitespace-nowrap mb-5">
              <span className="">{props.title}</span>
              <span className="">{props.date}</span>
          </div>

 
          <p className="font-normal text-xs text-slate-500 mb-4 relative z-50">
            {props.description}
          </p>
 
          <button className="border px-3 py-1 rounded-lg  border-gray-500 text-gray-300 text-xs">
            Read
          </button>
 
          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>
      </div>
    </div>

      {/* This looks cool but its pretty useless for a blog post card */}
      {/* <TextRevealCard
          text="You know the business"
          revealText="I know the chemistry "
        >
          <TextRevealCardTitle>
          <div className="flex justify-between whitespace-nowrap">
              <span className="p-3">{props.title}</span>
              <span className="p-3">{props.date}</span>
          </div>
          </TextRevealCardTitle>
          <TextRevealCardDescription>
            {props.description}
          </TextRevealCardDescription>
      </TextRevealCard> */}
      
      {/* Orignal somewhat bland design */}
      {/* <div className='shadow-[rgba(0,_0,_0,_0.15)_0px_3px_8px] rounded-xs
      w-[275px] sm:w-[375px] md:w-[450px] lg:w-[500px]
      cursor-pointer whitespace-nowrap mb-10
      '>

        <div className="p-3">{props.description}</div>
      </div> */}
    </Link>
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
      <div className="tg-app-main-container w-full text-[#444444] font-(family-name:--Inter)">
        <MenuBar />
        <main className="flex justify-center
        h-[calc(100vh-50px)]
        ml-5 md:ml-10
        mr-5 md:mr-10
        border-l border-r border-dashed border-[rgba(0,132,255,0.1)]
        overflow-scroll">
          <div className="">
            {postTitles.map((post: any, ind: any) => {
              const parts = post.split("---");
              return <div key={`div-${ind}`} className='pb-10'>
                <BlogPost key={ind} date={parts[0]} title={parts[1]} description={parts[2]} url={encodeURIComponent(post)} />
                <BlogPost key={ind} date={parts[0]} title={parts[1]} description={parts[2]} url={encodeURIComponent(post)} />
                <BlogPost key={ind} date={parts[0]} title={parts[1]} description={parts[2]} url={encodeURIComponent(post)} />
                <BlogPost key={ind} date={parts[0]} title={parts[1]} description={parts[2]} url={encodeURIComponent(post)} />

              </div>
            })
            }
          </div>
        </main>
      </div>
    );
  } catch(e) {
    return (
      <>
      <div className="flex animate-pulse space-x-4">
        <div className="size-10 rounded-full bg-gray-200"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded bg-gray-200"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-gray-200"></div>
              <div className="col-span-1 h-2 rounded bg-gray-200"></div>
            </div>
            <div className="h-2 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
      </>
    )
  }
}
