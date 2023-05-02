import NavBar from './components/NavBar'
import './globals.css'
import Providers from './providers'

export const metadata = {
  title: 'Tic Tac Toe',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-slate-800 h-screen overflow-hidden text-white text-center'>
        <Providers>
          <NavBar/>
          {children}
        </Providers>
      </body>
    </html>
  )
}
