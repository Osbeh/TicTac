import React from 'react'

type Props = {
    playerId: string | undefined,
    winner: string,
    playerCharacter: string | null,
    playerMoves: number[][],
    computerMoves: number[][]
}

async function createGame({playerId, playerCharacter, playerMoves, computerMoves, winner}:Props) {
    if (!playerId)  {
        window.location.reload()
        return
    }
    console.log('creating game')
    const response = await fetch('http://localhost:3000/api/games', {
      method: 'POST',
      body: JSON.stringify({ playerId, playerCharacter, playerMoves, computerMoves, winner}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    window.location.reload()
  }

export default function GameOver({playerId, winner, playerCharacter, playerMoves, computerMoves}: Props) {
    // if (playerId) {
    //     createGame({playerId, playerCharacter, playerMoves, computerMoves, winner})
    // }
  return (
    <div className='w-max m-auto pt-10'>
          <h1 className='text-3xl font-bold text-center p-6'>{winner === 'Draw' ? 'Draw' : winner === playerCharacter ? 'You Win' : 'You Lose'}!</h1>
          <button className='w-max m-auto p-2 bg-purple-500 text-white font-bold rounded-md' onClick={() => createGame({playerId, playerCharacter, playerMoves, computerMoves, winner})}>Play Again</button>
    </div>
  )
}