'use client'
import { useRouter } from 'next/navigation'

export default function GoBackButton () {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className='bg-amber-400 rounded  text-xl px-10 py-3 text-center font-bold cursor-pointer hover:bg-amber-600 hover:text-white transition-all'
    >
      Regresar
    </button>
  )
}
