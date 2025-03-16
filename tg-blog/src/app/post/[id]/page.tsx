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
  const postContentBaseUrl = 'https://raw.githubusercontent.com/timgerstel/timgerstel.github.io/refs/heads/master/posts/'
  const { id } = await params;
  const postContent = await fetch(postContentBaseUrl + id).then(res => res.text());
  const processedContent = await remark()
    .use(html)
    .process(postContent);
  const contentHtml = processedContent.toString();

  return (<>
    <div className="tg-app-main-container w-full text-[#444444]">
      <MenuBar />
      <main className="flex justify-center
      h-[calc(100vh-50px)]
      ml-5 md:ml-10
      mr-5 md:mr-10
      border-l border-r border-dashed border-[rgba(0,132,255,0.1)] overflow-hidden">
        <div className='w-full
        shadow-[0_3px_10px_rgb(0,0,0,0.2)]
        m-6 p-4' >
          <article className='prose w-full' dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </main>
    </div>
  </>)
}