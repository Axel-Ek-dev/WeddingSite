import Button from './ui/Button'
import { useRouter } from 'next/router'

export default function HeroSection(){
  const router = useRouter()
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const bgUrl = `${basePath}/images/AmEd.jpg`
  return (
    <section
      className="min-h-[30vh] md:min-h-screen flex items-center hero-bg"
      style={{
        backgroundImage: `linear-gradient(rgba(250,247,242,0.78), rgba(250,247,242,0.78)), url('${bgUrl}')`
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto py-16">
          <div className="text-5xl text-forest">♥</div>
          <h1 className="mt-6 text-6xl md:text-7xl leading-tight font-serif text-forest">Axel &amp; Amanda</h1>
          <p className="mt-4 tracking-widest text-sm text-muted uppercase">gifter sig</p>

          <div className="mt-8 flex items-center justify-center space-x-4">
            <Button variant="primary" onClick={() => router.push('./rsvp')}>OSA nu</Button>
            <Button variant="secondary" onClick={() => router.push('./info')}>Se detaljer</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
