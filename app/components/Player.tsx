'use client'
import { signOut, useSession } from 'next-auth/react';
import React from 'react'


export default function Player({player}: {player: PlayerProps}) {
    const { data: session } = useSession();
    if (!session) return (
        <div>Problem displaying data</div>
    )

    async function deleteUser() {
        if (!session?.user) return
       if (window.confirm("Are you sure you want to delete your account?")) {
        fetch(`/api/players/${session.user._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async () => {
            await signOut({ callbackUrl: '/' })
        })
        
        }
    }

  return (
    <div className="mt-4">
        <div className="text-pink-500 p-4">Information visible only to you:</div>
        <div className="text-pink-300">Email: {player.email}</div>
        <div className="text-pink-300">Player ID: {session.user?._id}</div>
        <button onClick={() => deleteUser()} className="bg-red-700 p-2 rounded-md text-white mt-4">
            DELETE ACCOUNT
        </button>
    </div>
  )
}