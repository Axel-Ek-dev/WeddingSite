import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

export default function AdminLogin(){
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handle(e: React.FormEvent){
    e.preventDefault()
    const expected = process.env.NEXT_PUBLIC_ADMIN_PIN || '1234'
    if (pin === expected){
      // set local flag
      localStorage.setItem('admin_auth', '1')
      router.push('/admin/dashboard')
    } else {
      setError('Fel PIN')
    }
  }

  return (
    <Layout title="Admininloggning">
      <h1 className="text-2xl font-semibold">Admininloggning</h1>
      <form onSubmit={handle} className="mt-6 max-w-sm">
        <label className="block">Ange admin-PIN</label>
        <input value={pin} onChange={(e)=>setPin(e.target.value)} className="mt-2 block w-full border rounded p-2" />
        {error && <p className="text-red-600">{error}</p>}
        <div className="mt-4">
          <button className="bg-forest text-white px-4 py-2 rounded">Logga in</button>
        </div>
      </form>
    </Layout>
  )
}
