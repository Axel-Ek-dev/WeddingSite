import { getSupabaseClient } from './supabase'

export type RSVP = {
  id: string
  name: string
  email: string
  attending: boolean
  guestCount: number
  speech?: boolean | null
  mealPreference?: string | null
  notes?: string | null
  createdAt: string
}

export type Gift = {
  id: string
  name: string
  description?: string
  imageUrl?: string
  link?: string
  reserved?: boolean
  reservedBy?: string | null
  createdAt?: string
}

function mapGift(row: any): Gift {
  return {
    id: row.id,
    name: row.name ?? row.title ?? '',
    description: row.description ?? '',
    imageUrl: row.imageUrl ?? row.image_url ?? undefined,
    link: row.link ?? undefined,
    reserved: row.reserved ?? false,
    reservedBy: row.reservedBy ?? row.reserved_by ?? null,
    createdAt: row.createdAt ?? row.created_at ?? undefined
  }
}

function mapRsvp(row: any): RSVP {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    attending: !!row.attending,
    guestCount: row.guestCount ?? row.guest_count ?? 0,
    speech: row.speech ?? null,
    mealPreference: row.mealPreference ?? row.meal_preference ?? null,
    notes: row.notes ?? null,
    createdAt: row.createdAt ?? row.created_at ?? new Date().toISOString()
  }
}

// DataService: uses Supabase if configured, otherwise falls back to localStorage + public JSON
export const data = {
  async listGifts(): Promise<Gift[]> {
    const SUPABASE = getSupabaseClient()
    if (SUPABASE) {
      const { data: gifts, error } = await SUPABASE.from('gifts').select('*')
      if (error) throw error
      return ((gifts as any[]) || []).map(mapGift)
    }
    // fallback: fetch public data file using relative path (works on GitHub Pages subpaths)
    try {
      const res = await fetch('./data/gifts.json')
      if (!res.ok) {
        console.error('Failed to fetch local gifts.json:', res.status, res.statusText)
        return []
      }
      const list = await res.json()
      return list as Gift[]
    } catch (err) {
      console.error('Error fetching local gifts.json', err)
      return []
    }
  },

  async listRsvps(): Promise<RSVP[]> {
    const SUPABASE = getSupabaseClient()
    if (SUPABASE) {
      const { data: rsvps, error } = await SUPABASE.from('rsvps').select('*').order('created_at', { ascending: false })
      if (error) throw error
      return ((rsvps as any[]) || []).map(mapRsvp)
    }
    const raw = localStorage.getItem('demo_rsvps')
    if (!raw) return []
    return JSON.parse(raw) as RSVP[]
  },

  async saveRsvp(payload: Omit<RSVP, 'id' | 'createdAt'>): Promise<RSVP> {
    const SUPABASE = getSupabaseClient()
    if (SUPABASE) {
      try {
        const insertPayload = {
          name: payload.name,
          email: payload.email,
          attending: payload.attending,
          guest_count: payload.guestCount,
          speech: payload.speech ?? null,
          // meal_preference is omitted because the table does not have that column by default
          notes: payload.notes ?? null
        }
        const { data: created, error } = await SUPABASE.from('rsvps').insert([insertPayload]).select().single()
        if (error) throw error
        return mapRsvp(created)
      } catch (err) {
        // If Supabase fails (e.g., table missing or RLS blocks), fall back to local demo storage
        console.error('Supabase RSVP insert failed, falling back to local storage', err)
      }
    }
    const list = (await this.listRsvps()) as RSVP[]
    const item: RSVP = {
      ...payload,
      id: 'r_' + Date.now(),
      createdAt: new Date().toISOString()
    }
    list.unshift(item)
    localStorage.setItem('demo_rsvps', JSON.stringify(list))
    return item
  },

  async reserveGift(giftId: string, name?: string | null): Promise<Gift> {
    const SUPABASE = getSupabaseClient()
    if (SUPABASE) {
      try {
        const { data: updated, error } = await SUPABASE.from('gifts').update({ reserved: true, reserved_by: name ?? null }).eq('id', giftId).select().single()
        if (error) throw error
        return mapGift(updated)
      } catch (err) {
        console.error('Supabase reserveGift failed, falling back to local storage', err)
      }
    }
    const gifts = await this.listGifts()
    const g = gifts.find((x) => x.id === giftId)
    if (!g) throw new Error('Not found')
    g.reserved = true
    g.reservedBy = name || null
    // store in localStorage for demo
    localStorage.setItem('demo_gifts', JSON.stringify(gifts))
    return g
  },

  async unreserveGift(giftId: string) {
    const SUPABASE = getSupabaseClient()
    if (SUPABASE) {
      try {
        const { data: updated, error } = await SUPABASE.from('gifts').update({ reserved: false, reserved_by: null }).eq('id', giftId).select().single()
        if (error) throw error
        return mapGift(updated)
      } catch (err) {
        console.error('Supabase unreserveGift failed, falling back to local storage', err)
      }
    }
    const gifts = await this.listGifts()
    const g = gifts.find((x) => x.id === giftId)
    if (!g) throw new Error('Not found')
    g.reserved = false
    g.reservedBy = null
    localStorage.setItem('demo_gifts', JSON.stringify(gifts))
    return g
  }
}
