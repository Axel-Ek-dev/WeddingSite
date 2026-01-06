import Layout from '../../components/Layout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { data, RSVP, Gift } from '../../lib/data'
import { getSupabaseClient } from '../../lib/supabase'

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
  const router = useRouter()
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [gifts, setGifts] = useState<Gift[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function checkAuthAndLoad(){
      const SUPABASE = getSupabaseClient()
      // If Supabase is configured, require a session
      if (SUPABASE) {
        try {
          const { data: sessionData } = await SUPABASE.auth.getSession()
          if (!sessionData?.session) {
            router.replace('/admin/login')
            return
          }
        } catch (err) {
          console.error('Auth check failed:', err)
          router.replace('/admin/login')
          return
        }
      } else {
        // Fallback demo auth using localStorage
        const auth = localStorage.getItem('admin_auth')
        if (!auth) {
          router.replace('./admin/login')
          return
        }
      }

      async function load(){
        try {
          const r = await data.listRsvps()
          const g = await data.listGifts()
          // override with demo storage if set
          const demoG = localStorage.getItem('demo_gifts')
          if (demoG) {
            try{ setGifts(JSON.parse(demoG)) } catch { setGifts(g) }
          } else setGifts(g)
          setRsvps(r)
        } catch (err) {
          console.error('Failed to load admin data:', err)
          setRsvps([])
          setGifts([])
        } finally {
          setLoading(false)
        }
      }
      load()
    }

    checkAuthAndLoad()
  },[])

  function exportCsv(){
    const headers = ['id','name','email','attending','guestCount','speech','mealPreference','notes','createdAt']
    const rows = rsvps.map(r => {
      const anyR: any = r as any
      const guestCount = anyR.guestCount ?? anyR.guest_count ?? ''
      const speech = anyR.speech ?? ''
      const meal = anyR.mealPreference ?? anyR.meal_preference ?? ''
      const created = anyR.createdAt ?? anyR.created_at ?? ''
      const attending = anyR.attending ?? anyR.attending ?? ''
      return [anyR.id ?? '', anyR.name ?? '', anyR.email ?? '', String(attending), String(guestCount), String(speech), meal || '', anyR.notes || '', created]
    })
    const csv = [headers.join(','), ...rows.map(r=> r.map(c=> '"'+String(c).replace(/"/g,'""')+'"').join(','))].join('\n')
    download('rsvps.csv', csv)
  }

  function logout(){
    localStorage.removeItem('admin_auth')
    router.push('./')
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
