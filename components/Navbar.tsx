import Link from 'next/link'
import Button from './ui/Button'

export default function Navbar(){
  return (
    <header className="sticky top-0 z-30 bg-cream/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-serif text-forest">A & A</div>
        </div>

        <nav className="hidden md:flex items-center space-x-6 font-medium text-sm text-near-black">
          <Link href="/">Hem</Link>
          <Link href="/info">Detaljer</Link>
          <Link href="/rsvp">OSA</Link>
          <Link href="/registry">Önskelista</Link>
          <Link href="/admin/login"><Button variant="secondary" className="py-1 px-3 text-sm">Admin</Button></Link>
        </nav>

        <div className="md:hidden">
          <button aria-label="Open menu" className="text-near-black">Menu</button>
        </div>
      </div>
    </header>
  )
}
