/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link'
import MenuBar from './menubar';

function BlogPost(props: any){
  return (
    <div className=''>
    <Link href={`/post/${props.url}`}>
      <div className='shadow-[rgba(0,_0,_0,_0.15)_0px_3px_8px] rounded-md
      w-[275px] sm:w-[375px] md:w-[450px] lg:w-[500px]
      cursor-pointer whitespace-nowrap mb-10
      '>
        <div className="flex justify-between border-b border-dashed border-[rgb(0,0,0,0.2)] mt-10
        whitespace-nowrap">
          <span className="p-3">{props.title}</span>
          <span className="p-3">{props.date}</span>
        </div>
        <div className="p-3">{props.description}</div>
      </div>
    </Link>
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
      <div className="tg-app-main-container w-full text-[#444444]">
        <MenuBar />
        <main className="flex justify-center
        h-[calc(100vh-50px)]
        ml-10 sm:ml-20 md:ml-30 lg:ml-40
        mr-10 sm:mr-20 md:mr-30 lg:mr-40
        border-l border-r border-dashed border-[rgb(0,0,0,0.2)]
        overflow-scroll">
          <div className="">
            {postTitles.map((post: any, ind: any) => {
              const parts = post.split("---");
              return <div key={`div-${ind}`} className='pb-10'>
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
