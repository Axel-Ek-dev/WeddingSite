import Layout from '../components/Layout'

export default function Info(){
  return (
    <Layout title="Axel & Amanda — Detaljer">
      <h1 className="text-2xl font-semibold">Bröllopsinfo</h1>
      <div className="mt-4 space-y-4">
        <div>
          <h3 className="font-semibold">Datum & tid</h3>
          <p>12 juni 2026 — Ceremoni kl. 15:00</p>
        </div>
        <div>
          <h3 className="font-semibold">Plats</h3>
          <p>Stora Gården — <a className="text-forest" href="https://www.google.com/maps">Visa på karta</a></p>
        </div>
        <div>
          <h3 className="font-semibold">Klädkod</h3>
          <p>Smart casual — sommarvänligt</p>
        </div>
        <div>
          <h3 className="font-semibold">Schema</h3>
          <p>Ceremoni 15:00, Mingel 17:00, Middag 19:00</p>
        </div>
      </div>
    </Layout>
  )
}
