import Link from 'next/link';
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
    if (!games) {
        return <div className='mt-4 text-pink-300'>No games found</div>
    }
  return (
    <div className='mt-4'>
        <h1 className='font-bold text-xl text-pink-500'>Game History</h1>
        <div>
            <ul>
                {games.map((game:GameProps) => {
                    return (
                    <Link href={`/games/${game._id}`} key={game._id}>
                        <li>{game.playedAt} {game.winner === game.playerChar ? 'Won' : game.winner === 'Draw' ? 'Draw' : 'Lost'}</li>
                    </Link>
                    )
                }
                )}
                
            </ul>
            </div>
    </div>
  )
}