import Layout from '../components/Layout'

export default function Info(){
  return (
    <Layout title="Axel & Amanda — Detaljer">
      <h1 className="text-2xl font-semibold">Bröllopsinfo</h1>
      <div className="mt-4 space-y-4">
        <div>
          <h3 className="font-semibold">Datum & tid</h3>
          <p>5e september 2026 — Ceremoni kl. 14:00</p>
        </div>
        <div>
          <h3 className="font-semibold">Plats</h3>
          <p> Vårdnäs Stiftsgård Hotell och Konferens — <a className="text-forest" href="https://maps.app.goo.gl/pRZX4wSHQJpGgmEe9">Visa på karta</a></p>
        </div>
        <div>
          <h3 className="font-semibold">Klädkod</h3>
          <p>Mörk kostym - Undrar du vad mörk kostym betyder? Klicka här för att läsa mer.</p>
        </div>
        <div>
          <h3 className="font-semibold">Schema</h3>
          <p>Ceremoni 14:00 i Vårdnäs kyrka, Mingel 15:00, Middag 17:00</p>
        </div>
      </div>
    </Layout>
  )
}
