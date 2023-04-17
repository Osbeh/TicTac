'use client'
import React from 'react'

type Props = {}

type GameOptions = {
  val : 0 | 'X' | 'O'
}

export default function GameBoard({}: Props) {
    const [grid, setGrid] = React.useState<[0 | 'X' | 'O', 0 | 'X' | 'O', 0 | 'X' | 'O'][]>([
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ])

    const [turn, setTurn] = React.useState<'X' | 'O'>('X')

    const [winner, setWinner] = React.useState<'X' | 'O' | 'Draw' | null>(null)

    function gameClick(rowIndex:number, colIndex:number) {
      const newGrid = [...grid]
      newGrid[rowIndex][colIndex] = turn
      setTurn(turn === 'X' ? 'O' : 'X')
      setGrid(newGrid)
      checkWinner()
    }

    function checkWinner() {
      if (grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2] && grid[0][0] !== 0) {
        setWinner(grid[0][0])
      }
      if (grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2] && grid[1][0] !== 0) {
        setWinner(grid[1][0])
      }
      if (grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2] && grid[2][0] !== 0) {
        setWinner(grid[2][0])
      }
      if (grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0] && grid[0][0] !== 0) {
        setWinner(grid[0][0])
      }
      if (grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1] && grid[0][1] !== 0) {
        setWinner(grid[0][1])
      }
      if (grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2] && grid[0][2] !== 0) {
        setWinner(grid[0][2])
      }
      if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2] && grid[0][0] !== 0) {
        setWinner(grid[0][0])
      }
      if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0] && grid[0][2] !== 0) {
        setWinner(grid[0][2])
      }
      if (grid.every(row => row.every(col => col !== 0))) { 
        setWinner('Draw')
      }
    }

    if (winner) {
      return (
        <div className='w-max m-auto pt-10'>
          <h1 className='text-3xl font-bold text-center p-6'>{winner === 'Draw' ? 'Draw' : `${winner} is the winner!`}</h1>
          <button className='w-max m-auto p-2 bg-purple-500 text-white font-bold rounded-md' onClick={() => window.location.reload()}>Play Again</button>
        </div>
      )
    } 


  return (
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
  )
}