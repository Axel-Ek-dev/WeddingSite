import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { getSupabaseClient } from '../../lib/supabase'

export default function AdminLogin(){
  const [pin, setPin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [supabaseAvailable, setSupabaseAvailable] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setSupabaseAvailable(Boolean(getSupabaseClient()))
  }, [])

  // Supabase email/password sign-in
  async function handleEmailSignIn(e: React.FormEvent){
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const SUPABASE = getSupabaseClient()
      if (!SUPABASE) throw new Error('Supabase not configured')
      const { error } = await SUPABASE.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message || 'Login failed')
        return
      }
      router.push('/admin/dashboard')
    } catch (err: any) {
      setError(err?.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  // Fallback PIN flow for local/demo usage
  async function handlePin(e: React.FormEvent){
    e.preventDefault()
    const expected = process.env.NEXT_PUBLIC_ADMIN_PIN || '1234'
    if (pin === expected){
      // set local flag (demo fallback)
      localStorage.setItem('admin_auth', '1')
      router.push('/admin/dashboard')
    } else {
      setError('Fel PIN')
    }
  }

  return (
    <Layout title="Admininloggning">
      <h1 className="text-2xl font-semibold">Admininloggning</h1>

      {supabaseAvailable ? (
        <form onSubmit={handleEmailSignIn} className="mt-6 max-w-sm">
          <label className="block">E-post</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-2 block w-full border rounded p-2" />

          <label className="block mt-4">Lösenord</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-2 block w-full border rounded p-2" />

          {error && <p className="text-red-600">{error}</p>}

          <div className="mt-4">
            <button disabled={loading} className="bg-forest text-white px-4 py-2 rounded">{loading ? 'Loggar in…' : 'Logga in'}</button>
          </div>
        </form>
      ) : (
        <form onSubmit={handlePin} className="mt-6 max-w-sm">
          <label className="block">Ange admin-PIN (demo)</label>
          <input value={pin} onChange={(e)=>setPin(e.target.value)} className="mt-2 block w-full border rounded p-2" />
          {error && <p className="text-red-600">{error}</p>}
          <div className="mt-4">
            <button className="bg-forest text-white px-4 py-2 rounded">Logga in</button>
          </div>
        </form>
      )}
    </Layout>
  )
}
