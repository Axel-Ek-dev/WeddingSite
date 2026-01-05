import Button from './ui/Button'

export default function HeroSection(){
  return (
    <section className="min-h-[30vh] md:min-h-screen flex items-center hero-bg">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto py-16">
          <div className="text-5xl text-forest">♥</div>
          <h1 className="mt-6 text-6xl md:text-7xl leading-tight font-serif text-forest">Axel &amp; Amanda</h1>
          <p className="mt-4 tracking-widest text-sm text-muted uppercase">gifter sig</p>

          <div className="mt-8 flex items-center justify-center space-x-4">
            <Button variant="primary" onClick={() => window.location.href = '/rsvp'}>OSA nu</Button>
            <Button variant="secondary" onClick={() => window.location.href = '/info'}>Se detaljer</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
