import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import { Gift, data } from '../lib/data'

export default function Registry(){
  const [gifts, setGifts] = useState<Gift[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function load(){
      try {
        const g = await data.listGifts()
        // if demo storage present, merge
        const demo = localStorage.getItem('demo_gifts')
        if (demo) {
          try { setGifts(JSON.parse(demo)) } catch { setGifts(g) }
        } else {
          setGifts(g)
        }
      } catch (err) {
        console.error('Failed to load gifts:', err)
        setGifts([])
      } finally {
        setLoading(false)
      }
    }
    load()
  },[])

  async function reserve(gift: Gift){
    try{
      const name = window.prompt('Ditt namn för att reservera gåvan (valfritt):')
      if (name === null) return
      const updated = await data.reserveGift(gift.id, name || undefined)
      // update UI
      setGifts((prev)=> prev.map(x => x.id === updated.id ? updated : x))
    }catch(e){
      alert('Misslyckades att reservera')
    }
  }

  async function unreserve(gift: Gift){
    try{
      const updated = await data.unreserveGift(gift.id)
      setGifts((prev)=> prev.map(x => x.id === updated.id ? updated : x))
    }catch(e){
      alert('Misslyckades')
    }
  }

  return (
    <Layout title="Önskelista ">
      <h1 className="text-2xl font-semibold">Önskelista</h1>
      {loading ? <p className="mt-4">Laddar…</p> : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {gifts.map(g => (
            <div key={g.id} className="bg-white border rounded p-4">
              <h3 className="font-semibold">{g.name}</h3>
              <p className="text-sm text-gray-600">{g.description}</p>
              <p className="mt-2 text-sm">Status: {g.reserved ? 'Reserverad' : 'Tillgänglig'}</p>
              <div className="mt-3">
                {!g.reserved ? (
                  <button onClick={()=>reserve(g)} className="bg-forest text-white px-3 py-1 rounded">Reservera</button>
                ) : (
                  <button onClick={()=>unreserve(g)} className="border px-3 py-1 rounded">Avboka</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}
