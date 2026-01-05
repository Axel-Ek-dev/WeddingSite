import Layout from '../components/Layout'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { data } from '../lib/data'
import { useState } from 'react'

const schema = z.object({
  name: z.string().min(1, 'Obligatoriskt'),
  email: z.string().email('Ogiltig e-postadress'),
  attending: z.string(),
  guestCount: z.number().min(0).max(10).optional(),
  mealPreference: z.string().optional(),
  notes: z.string().optional()
})

type FormData = z.infer<typeof schema>

export default function RSVP(){
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { attending: 'yes', guestCount: 1 } })

  async function onSubmit(values: FormData){
    const payload = {
      name: values.name,
      email: values.email,
      attending: values.attending === 'yes',
      guestCount: values.guestCount ?? 1,
      mealPreference: values.mealPreference ?? null,
      notes: values.notes ?? null
    }
    await data.saveRsvp(payload)
    setSubmitted(true)
  }

  if (submitted) return (
    <Layout title="OSA — Skickad">
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold">Tack!</h2>
        <p className="mt-2">Din OSA är registrerad. Vi ser fram emot att träffa dig.</p>
      </div>
    </Layout>
  )

  return (
    <Layout title="RSVP">
      <h1 className="text-2xl font-semibold">RSVP</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium">Fullständigt namn</label>
          <input className="mt-1 block w-full border rounded p-2" {...register('name')} />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">E-post</label>
          <input className="mt-1 block w-full border rounded p-2" {...register('email')} />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Närvaro</label>
          <select {...register('attending')} className="mt-1 block w-full border rounded p-2">
            <option value="yes">Ja</option>
            <option value="no">Nej</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Antal gäster</label>
          <input type="number" className="mt-1 block w-full border rounded p-2" {...register('guestCount', { valueAsNumber: true })} />
        </div>

        <div>
          <label className="block text-sm font-medium">Måltidsval (valfritt)</label>
          <input className="mt-1 block w-full border rounded p-2" {...register('mealPreference')} />
        </div>

        <div>
          <label className="block text-sm font-medium">Meddelande (valfritt)</label>
          <textarea className="mt-1 block w-full border rounded p-2" {...register('notes')} />
        </div>

        <div>
          <button type="submit" className="bg-forest text-white px-4 py-2 rounded">Skicka OSA</button>
        </div>
      </form>
    </Layout>
  )
}
