"use client"

import { useSession, signIn, signOut } from "next-auth/react"

type Props = {}

const LoginButton = (props: Props) => {
const { data: session } = useSession();
if (session) {
    return (
        <div className="dropdown cursor-pointer shadow-black shadow-md bg-slate-700 self-center pl-4 pr-4 inline-block relative w-24 rounded-md hover:rounded-b-none transition-all ease-linear duration-300">
            {session.user?.name}
            <div className="dropdown-content bg-slate-700 hidden absolute z-10 right-0 w-24 rounded-b hover:font-bold hover:underline">
                <button className=" block w-20 m-auto" onClick={() => signOut()}>Log out</button>
            </div>
        </div>
    )
}
  return (
    <button className="bg-slate-700 shadow-black shadow-md rounded-md w-16 hover:font-bold hover:shadow-none hover:underline transition-all ease-linear duration-200" onClick={() => signIn()}>Log in</button>
  )
}

export default LoginButton