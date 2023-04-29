'use client'
import computerTurn from '@/lib/computerTurn'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import GameOver from './GameOver'

type Props = {}

export default function GameBoard({}: Props) {
    const [grid, setGrid] = React.useState<[0 | 'X' | 'O', 0 | 'X' | 'O', 0 | 'X' | 'O'][]>([
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ])

    const [turn, setTurn] = React.useState<'X' | 'O'>('X')
    const [winner, setWinner] = React.useState<'X' | 'O' | 'Draw' | null>(null)
    const [playerCharacter, setPlayerCharacter] = React.useState<'X' | 'O' | null>(null)
    const [computerCharacter, setComputerCharacter] = React.useState<'X' | 'O' | null>(null)
    const [playerMoves, setPlayerMove] = React.useState<number[][]>([])
    const [computerMoves, setComputerMove] = React.useState<number[][]>([])


    const { data: session } = useSession();

    useEffect(() => {
      if (!session && winner) {
        return
      }

      async function updatePlayer(matchResult:string, amount:number) {
        try { await fetch(`/api/players/${session?.user._id}`, {
          method: "PUT",
              headers: {
                  "Content-Type": "application/json"
              },
              body: `{"${matchResult}": ${amount}}`
        })
        } catch(err) {
          console.error(err)
        }
        // return res
      }

      async function getPlayer(id:string) {
        try {
            const response = await fetch(`http://localhost:3000/api/players/${id}`, {
                cache: 'no-store'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error)
            
            return
        }
      }

      if (session && winner) {
        //Update database

        if (winner === 'Draw') { 
          //get draws and update
          const player = getPlayer(session.user._id)
          player.then(data => {
            //Update player
            updatePlayer('draws', data.draws + 1)
            // update.then()
          })
        }

        if (winner === playerCharacter) {
          //get wins and update
          //Get player
          const player = getPlayer(session?.user._id)
          player.then(data => {
            //Update player
            updatePlayer('wins', data.wins + 1)
            // update.then()
          })
        }

        if (winner === computerCharacter) {
          //get loses and update
          const player = getPlayer(session?.user._id)
          player.then(data => {
            //Update player
            updatePlayer('losses', data.losses + 1)
            // update.then()
          })
        }
        
      }
      
      const checkWinner = () => {
        if (grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2] && grid[0][0] !== 0) {
          setWinner(grid[0][0])
          return
        }
        if (grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2] && grid[1][0] !== 0) {
          setWinner(grid[1][0])
          return
        }
        if (grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2] && grid[2][0] !== 0) {
          setWinner(grid[2][0])
          return
        }
        if (grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0] && grid[0][0] !== 0) {
          setWinner(grid[0][0])
          return
        }
        if (grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1] && grid[0][1] !== 0) {
          setWinner(grid[0][1])
          return
        }
        if (grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2] && grid[0][2] !== 0) {
          setWinner(grid[0][2])
          return
        }
        if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2] && grid[0][0] !== 0) {
          setWinner(grid[0][0])
          return
        }
        if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0] && grid[0][2] !== 0) {
          setWinner(grid[0][2])
          return
        }
        if (grid.every(row => row.every(col => col !== 0))) { 
          setWinner('Draw')
          return
        }
      }

      const randomizePlayerCharacter = () => {
        return ['X', 'O'][Math.floor(Math.random() * 2)] as 'X' | 'O'
      }

      if (!playerCharacter) {
        setPlayerCharacter(randomizePlayerCharacter)
        return
      }

      if (!computerCharacter) {
        setComputerCharacter(playerCharacter === 'X' ? 'O' : 'X')
        return
      }
      
      // if (turn === 'X') {
      if (turn === playerCharacter && !winner) {
        checkWinner()
        document.title = 'Tic Tac Toe | X'
      }
      else if (turn === computerCharacter && !winner)  {
        checkWinner()
        document.title = 'Tic Tac Toe | O'
        const newGrid = [...grid]
        const computerMove = computerTurn(newGrid)
        if (computerMove) {
          setComputerMove(prev => [...prev, computerMove])
          newGrid[computerMove[0]][computerMove[1]] = computerCharacter
          setGrid(newGrid)
          setTurn(playerCharacter)
        }
      }
      
    }, [turn, grid, winner, playerCharacter, computerCharacter, session])


    function gameClick(rowIndex:number, colIndex:number) {
      const newGrid = [...grid]
      newGrid[rowIndex][colIndex] = turn
      setPlayerMove(prev => [...prev, [rowIndex, colIndex]])
      setTurn(turn === 'X' ? 'O' : 'X')
      setGrid(newGrid)
    }

    if (winner) {
      return (
        <GameOver playerId={session?.user._id} winner={winner} playerChar={playerCharacter} playerMoves={playerMoves} computerMoves={computerMoves}/>
      )
    } 

    if (!playerCharacter || !computerCharacter) {
      return (
        <div className='w-max m-auto pt-10'>
          <h1 className='text-3xl font-bold text-center p-6'>Loading...</h1>
        </div>
      )
    }


  return (
    <div className='p-4'>
      <div className=' inline text-pink-300'>You play as: <p className={playerCharacter === 'X' ? 'text-blue-500 font-bold inline-block' : 'text-fuchsia-500 font-bold inline-block'}>{playerCharacter}</p></div>
      <div className=' text-pink-300'>AI plays as: <p className={playerCharacter === 'X' ? 'text-blue-500 font-bold inline-block' : 'text-fuchsia-500 font-bold inline-block'}>{computerCharacter}</p></div>
      <div className='grid grid-cols-3 grid-rows-3 gap-0 w-max m-auto pt-10'>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((col, colIndex) => (
                <div key={colIndex} className='w-28 h-28 p-2 border-2 border-red-500 text-center font-bold text-3xl flex justify-center items-center'>
                  {col === 0 ? <div className='cursor-pointer w-full h-full' onClick={() =>gameClick(rowIndex, colIndex)}> </div>
                  : 
                  <div className={col === 'X' ? 'text-blue-500 cursor-default' : 'text-fuchsia-500 cursor-default'}>
                    {col}
                  </div>}
                </div>
              ))}

            </div>
          )  
          )}
          
      </div>
    </div>
  )
}