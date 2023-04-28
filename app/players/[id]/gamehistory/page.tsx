import React from 'react'

interface ParamProps {
    params: {
        id: string
    }
}

async function getGames(id:string) {
    try {
        const response = await fetch(`http://localhost:3000/api/players/${id}/games`, {
            cache: 'no-store'
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
        return
    }
}

export default async function GameHistoryPage({ params } : ParamProps) {
    const games = await getGames(params.id)
    console.log(games)
  return (
    <div>GameHistory page</div>
    //loop through games...
  )
}