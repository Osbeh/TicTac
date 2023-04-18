import { Inter } from 'next/font/google'
import GameBoard from './components/GameBoard'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={inter.className}>
      <div>
       <GameBoard/>
      </div>
    </main>
  )
}
