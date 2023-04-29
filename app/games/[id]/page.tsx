import React from 'react'

type Props = {
    params: {
        id:string
    }
}

async function getGame(id:string) {
    const response = await fetch(`http://localhost:3000/api/games/${id}`)
    return await response.json()
}

async function getPlayer(id:string) {
    const response = await fetch(`http://localhost:3000/api/players/${id}`)
    return await response.json()
}


export default async function GamePage({params}: Props) {
    const game:GameProps = await getGame(params.id)
    const player:PlayerProps = await getPlayer(game.playerId)
    if (!player) {
        return <div>Loading...</div>
    }
    const grid:[0 | string, 0 | string, 0 | string][] = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ]

    game.playerMoves.map((move, index) => grid[move[0]][move[1]] = `${game.playerChar}${index + 1}`)
    game.computerMoves.map((move, index) => grid[move[0]][move[1]] = `${game.playerChar === 'X' ? 'O' : 'X'}${index + 1}`)
    
  return (
    <div className='mt-4'>
        <h1 className='text-pink-500 text-xl font-bold'>Game details for {params.id}</h1>
        <div>
            <p>Player {player.name} played as {game.playerChar}</p>
            <p>Result: {game.winner === 'Draw' ? 'Draw' : game.winner === game.playerChar ? 'Win' : 'Defeat'}</p>
            <p>Game played on {game.playedAt}</p>
            <div className='mt-4'>
                <p>Game History:</p>
                <div className='grid grid-cols-3 grid-rows-3 gap-0 w-max m-auto pt-10'>
                {grid.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((col, colIndex) => (
                <div key={colIndex} className='w-28 h-28 p-2 border-2 border-red-500 text-center font-bold text-3xl flex justify-center items-center'>
                  {col === 0 ? <div className='w-full h-full'> </div>
                  : 
                  <div className={col.charAt(0) === 'X' ? 'text-blue-500 cursor-default' : 'text-fuchsia-500 cursor-default'}>
                    {col}
                  </div>}
                </div>
              ))}

            </div>
          )  
          )}
                </div>

            </div>
        </div>
    </div>
  )
}