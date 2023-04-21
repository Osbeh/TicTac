import React from 'react'
import LoginButton from './LoginButton'
import Link from 'next/link'

type Props = {}

export default function NavBar(props: Props) {
  return (
    <div className=' text-center mt-0 text-pink-600 shadow-lg shadow-fuchsia-500 h-24'>
    <Link className='relative top-6' href='/'><h1 className="heading text-4xl font-bold text-pink-600">Tic Tac Toe</h1></Link>
    <div className=' absolute right-8 top-8 flex gap-8 h-12 '>
        <Link className=' self-center' href='/players'><button className=' relative hover:font-bold hover:underline transition-all ease-linear duration-200'>Players</button></Link>
        <LoginButton/>
    </div>
    </div>
  )
}