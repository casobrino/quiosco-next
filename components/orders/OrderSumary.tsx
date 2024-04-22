'use client'
import { useStore } from '@/src/store'
import { ProductDetails } from './ProductDetails'

export default function OrderSumary () {
  const order = useStore(state => state.order)
  return (
    <aside className='lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5'>
      <h1 className='text-4xl text-center font-black'>Mi pedido</h1>

      {order.length === 0
        ? <span className='text-center block my-10'>No items agregados</span>
        : (<div className='mt-5'> {order.map(item => (
          <ProductDetails key={item.id} item={item} />
        ))}</div>)
      }
    </aside>
  )
}

