/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const postContentBaseUrl = 'https://raw.githubusercontent.com/timgerstel/timgerstel.github.io/refs/heads/master/posts/'
  const { id } = await params;
  const postContent = await fetch(postContentBaseUrl + id).then(res => res.text());
  const processedContent = await remark()
    .use(html)
    .process(postContent);
  const contentHtml = processedContent.toString();

  return (<>
    <div className="tg-app-main-container w-full text-[#444444]">
        <div className="w-full h-[50px] border-b border-dashed border-[rgb(0,0,0,0.2)]">
          <div className="flex items-center gap-10
            h-full ml-40 mr-40 pl-10 pr-10
            border-l border-r border-dashed border-[rgb(0,0,0,0.2)]
          font-bold">
            <Link href="/">Timothy Gerstel</Link>
            <a href="https://github.com/timgerstel">GitHub</a>
            <a href="https://www.linkedin.com/in/timgerstel/">LinkedIn</a>
          </div>
        </div>
        <main className="flex justify-center h-screen ml-40 mr-40 border-l border-r border-dashed border-[rgb(0,0,0,0.2)]">
          <div className='w-full p-10'>
            <article className='prose w-full' dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>
        </main>
      </div>
  </>)
}