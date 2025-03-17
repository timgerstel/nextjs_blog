/* eslint-disable @typescript-eslint/no-unused-vars */
import MenuBar from '../../menubar';
import Link from 'next/link';
import { remark } from 'remark';
import html from 'remark-html';

export async function generateStaticParams() {
  try{
    const res = await fetch("https://api.github.com/repos/timgerstel/timgerstel.github.io/git/trees/master?recursive=1")
    const json = await res.json();
    const postUrl = json.tree.filter((item: any) => item.path === "posts")[0].url;
    const postsRes = await fetch(postUrl);
    const postsJson = await postsRes.json();
    const posts = postsJson.tree;
  
    return await posts.map((item: any) => ({id: encodeURIComponent(item.path)}));
  } catch (e) {
    return [];
  }
}

export default async function Page({ params }: {params: Promise<{id: string}>}) {
  try{
  const postContentBaseUrl = 'https://raw.githubusercontent.com/timgerstel/timgerstel.github.io/refs/heads/master/posts/'
  const { id } = await params;
  const postContent = await fetch(postContentBaseUrl + id).then(res => res.text());
  const processedContent = await remark()
    .use(html)
    .process(postContent);
  const contentHtml = processedContent.toString();

  return (<>
    <div className="tg-app-main-container w-full">
      <MenuBar />
      <main className="flex justify-center
      h-[calc(100vh-50px)]
      ml-5 md:ml-10
      mr-5 md:mr-10
      border-l border-r border-dashed border-[rgba(0,132,255,0.1)] overflow-hidden">
        <div className='w-full
        shadow-[0_3px_10px_rgb(0,0,0,0.2)]
        dark:shadow-[0_3px_10px_#ffffff10]
        p-3 lg:m-6 lg:p-4'>
          <article className='prose dark:prose-invert w-full' dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </main>
    </div>
  </>)
  } catch (e) {
    return (<div className="tg-app-main-container w-full font-(family-name:--Inter)">
        <MenuBar />
        <main className="flex flex-col justify-center
        h-[calc(100vh-50px)]
        ml-5 md:ml-10
        mr-5 md:mr-10
        border-l border-r border-dashed border-[rgba(0,132,255,0.1)]
        overflow-scroll">
          <div className="flex animate-pulse space-x-4">
            <div className="size-10 rounded-full bg-gray-200"></div>
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
      </div>)
  }
}