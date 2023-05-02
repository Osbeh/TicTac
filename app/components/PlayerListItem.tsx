'use client'
import Link from 'next/link'
import React from 'react'

type Props = {
    name:string,
    id:string,
    index:number
}

export default function PlayerListItem({name, id, index}: Props) {
  return (
     <Link href={`/players/${id}`}>
            <div className=" group flex flex-row w-48 justify-between border-b border-b-pink-400 p-2">
                <h2 className="font-bold text-pink-500 text-xl">{index+1}</h2>
                <div className="w-24 text-left group-hover:underline"><h2>{name}</h2></div>
            </div>
     </Link>
  )
}