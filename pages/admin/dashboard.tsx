import Layout from '../../components/Layout'
import { useEffect, useState } from 'react'
import { data, RSVP, Gift } from '../../lib/data'

function download(filename: string, content: string){
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function Dashboard(){
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [gifts, setGifts] = useState<Gift[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const auth = localStorage.getItem('admin_auth')
    if (!auth) {
      window.location.href = '/admin/login'
      return
    }
    async function load(){
      const r = await data.listRsvps()
      const g = await data.listGifts()
      // override with demo storage if set
      const demoG = localStorage.getItem('demo_gifts')
      if (demoG) {
        try{ setGifts(JSON.parse(demoG)) } catch { setGifts(g) }
      } else setGifts(g)
      setRsvps(r)
      setLoading(false)
    }
    load()
  },[])

  function exportCsv(){
    const headers = ['id','name','email','attending','guestCount','mealPreference','notes','createdAt']
    const rows = rsvps.map(r => [r.id, r.name, r.email, String(r.attending), String(r.guestCount), r.mealPreference || '', r.notes || '', r.createdAt])
    const csv = [headers.join(','), ...rows.map(r=> r.map(c=> '"'+String(c).replace(/"/g,'""')+'"').join(','))].join('\n')
    download('rsvps.csv', csv)
  }

  function logout(){
    localStorage.removeItem('admin_auth')
    window.location.href = '/'
  }

  return (
    <Layout title="Adminpanel">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Adminpanel</h1>
        <div>
          <button onClick={logout} className="border px-3 py-1 rounded">Logga ut</button>
        </div>
      </div>

      {loading ? <p className="mt-4">Laddar…</p> : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border rounded p-4">
            <h2 className="font-semibold">OSAs ({rsvps.length})</h2>
            <div className="mt-3">
              <button onClick={exportCsv} className="bg-forest text-white px-3 py-1 rounded">Exportera CSV</button>
            </div>
            <ul className="mt-4 space-y-2">
              {rsvps.map(r => (
                <li key={r.id} className="border rounded p-2">
                  <div className="font-semibold">{r.name} — {r.attending ? 'Kommer' : 'Kommer inte'}</div>
                  <div className="text-sm text-gray-600">{r.email} • Gäster: {r.guestCount}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border rounded p-4">
            <h2 className="font-semibold">Gåvor</h2>
            <ul className="mt-3 space-y-2">
              {gifts.map(g => (
                <li key={g.id} className="border rounded p-2 flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{g.name}</div>
                    <div className="text-sm text-gray-600">{g.description}</div>
                    <div className="text-sm">Status: {g.reserved ? 'Reserverad' : 'Tillgänglig'}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Layout>
  )
}
