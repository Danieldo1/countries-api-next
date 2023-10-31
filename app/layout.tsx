import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const nunitoSans = Nunito_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Find Country Info',
  description: 'Find a cool info about countries',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunitoSans.className}>
        <main className='bg-gray-100 min-h-screen flex flex-col items-center'>
          <nav className='w-full bg-white h-16 flex items-center justify-center fixed'>
            <section className=' flex items-center gap-3'>
              <Link href="/">
              <h1 className='font-bold text-2xl'><span className='text-4xl'>🌎</span> Find Country Info</h1>
              </Link>
            </section>
          </nav>
        {children}
        </main>
        
        </body>
    </html>
  )
}
