
import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const nunitoSans = Nunito_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Find Country Info',
  description: 'Find a cool info about countries',
  icons: {
    icon: 'https://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/256/globe-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  return (
    <html lang="en">
      <body className={nunitoSans.className}>
        <main className="bg-gray-100 min-h-screen flex flex-col items-center">
          <nav className="w-full bg-white h-16 flex items-center justify-center">
            <section className="container flex items-center gap-3">
              <Link href="/">
              <h1 className='font-bold text-2xl  justify-center items-center flex flex-1 ml-4 '><span className='text-4xl'>🌎</span> Find Country Info</h1>
              </Link>
            </section>
          </nav>
        {children}
        </main>
        </body>
    </html>
  )
}
