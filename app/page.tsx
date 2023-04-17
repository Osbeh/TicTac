import { Inter } from 'next/font/google'
import GameBoard from './components/GameBoard'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={inter.className}>
      <div className="bg-slate-800 h-screen overflow-hidden text-white text-center">
       <h1 className="heading text-4xl font-bold text-pink-600 p-8 shadow-lg shadow-fuchsia-500">Tic Tac Toe</h1>
       <GameBoard/>
      </div>
    </main>
  )
}
