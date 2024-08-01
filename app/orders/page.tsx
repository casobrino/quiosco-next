'use client'
import LatestOrder from '@/components/orders/LatestOrder'
import Logo from '@/components/ui/logo'
import { OrderWithProducts } from '@/src/types'
import useSWR from 'swr'

export default function OrdersPage () {
  const url = '/orders/api'
  const fetcher = () => fetch(url).then(res => res.json()).then(datos => datos)
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 10000,
    revalidateOnFocus: false
  })
  if (isLoading) return (<p>Cargando...</p>)
  return (
    <>
      <h1 className='text-center mt-20 text-6xl font-black'></h1>
      <Logo />
      {data?.length
        ? (
          <div className="gird grid-cols-2 gap-5 max-w-5xl mx-auto mt-10" >
            {
              data.map(order => (
                <LatestOrder
                  order={order}
                  key={order.id}
                />
              ))
            }
          </div>
        )
        : (
          <p className='text-center my-10'>No hay ordenes Listas</p>
        )}

    </>
  )
}
