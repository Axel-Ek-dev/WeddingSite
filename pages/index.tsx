import Layout from '../components/Layout'
import HeroSection from '../components/HeroSection'
import InfoCard from '../components/InfoCard'

export default function Home() {
  return (
    <Layout title="Axel & Amanda — Home">
      <HeroSection />

      <section className="mt-1 container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16 justify-items-center">
          <InfoCard icon={<span>📅</span>} title="När" description={<span>5e september 2026 — Ceremoni kl. 14:00</span>} />
          <InfoCard icon={<span>📍</span>} title="Var" description={<span>Vårdnäs Stiftsgård Hotell och Konferens <a className='text-forest' href='https://maps.app.goo.gl/pRZX4wSHQJpGgmEe9'>Visa på karta</a></span>} />
          <InfoCard icon={<span>👗</span>} title="Klädkod" description={<span>Mörk kostym - Undrar du vad mörk kostym betyder? <a className='text-forest' href='https://maps.app.goo.gl/pRZX4wSHQJpGgmEe9'>Visa på kartaKlicka här för att läsa mer.</a></span>} />
        </div>
      </section>

      <section className="mt-12 container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-serif">Välkommen</h2>
          <p className="mt-2 text-muted">Vi är så glada att du är här. Utforska sidan för detaljer om ceremonin, boende och vår önskelista.</p>
        </div>
      </section>
    </Layout>
  )
}
