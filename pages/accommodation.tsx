import Layout from '../components/Layout'

export default function Accommodation(){
  return (
    <Layout title="Boende">
      <h1 className="text-2xl font-semibold">Boende</h1>
      <p className="mt-4">Vi har ett rumspaket på Hotel Staden. Ange "Axel & Amanda" vid bokning för rabatterat pris.</p>
      <div className="mt-4">
        <h3 className="font-semibold">Bokning</h3>
        <p>Kontakt: bookings@example.com — Telefon: +46 70 123 4567</p>
      </div>
    </Layout>
  )
}
