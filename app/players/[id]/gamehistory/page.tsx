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
    games.reverse()
  return (
    <div className='mt-4'>
        <h1 className='font-bold text-xl text-pink-500'>Game History</h1>
        <div className=' h-screen overflow-auto'>
            <ul>
                {games.map((game:GameProps) => {
                    const gameDate = new Date(game.playedAt)
                    return (
                        <div className='mt-4 flex justify-center' key={game._id}>
                            {/* <GameRow game={game}/> */}
                        <Link href={`/games/${game._id}`} >
                            <li className='text-white border-b-2 border-pink-300 p-2 hover:underline'>
                                {gameDate.toString()} 
                                {game.winner === game.playerChar ? <p className='text-green-500'>Win</p> : game.winner === 'Draw' ? <p className='text-gray-500'>Draw</p> : <p className='text-red-500'>Defeat</p>}
                            </li> 
                        </Link>
                    </div>
                    )
                }
                )}
                
            </ul>
            </div>
    </div>
  )
}
