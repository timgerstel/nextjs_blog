"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "./button"
import { redirect } from 'next/navigation'

type BlogPost = {
  id: string
  title: string
  date: string
  desc: string
  url: string
}
 
export const TEST_POSTS: BlogPost[] = [
  {
    id: "728ed52f",
    title: 'ya motha',
    date: "pending",
    desc: "post desc 1",
    url: "http://asdf.asdf"
  },
  {
    id: "489e1d42",
    title: 'ya motha 2',
    date: "pending",
    desc: "post desc 2",
    url: "http://asdf.asdf"
  },
  // ...
]

 
export const columns: ColumnDef<BlogPost>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
 
      return <div className="whitespace-pre overflow-hidden text-ellipsis max-w-20 sm:max-w-48 md:max-w-72 lg:max-w-96 xl:max-w-none font-bold" onClick={() => redirect('/post/' + row.original.url)}>{row.getValue("title")}</div>
    },
  },
  {
    accessorKey: "desc",
    header: "Description",
    cell: ({ row }) => {
 
      return <div className="whitespace-pre overflow-hidden text-ellipsis max-w-48 md:max-w-72 lg:max-w-96 xl:max-w-none font-bold" onClick={() => redirect('/post/' + row.original.url)}>{row.getValue("desc")}</div>
    },
  },
  {
    accessorKey: "date",
    sortDescFirst: true,
    header: ({ column }) => {
      return (
        <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <div className=" hover:bg-slate-400 dark:hover:bg-slate-700 py-1 pr-2 rounded">
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </Button>
        </div>
      )
    },
    cell: ({ row }) => {
 
      return <div className="text-right" onClick={() => redirect('/post/' +  row.original.url)}>{row.getValue("date")}</div>
    },
  },
]