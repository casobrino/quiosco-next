import { OrderWithProducts } from '@/src/types'

type LatestOrderProps = {
  order: OrderWithProducts
}
export default function LatestOrder ({ order }: LatestOrderProps) {
  return (
    <div className='bg-white shadow p-5 my-5 rounded-lg'>
      <p className='text-2xl font-bold text-slate-600'>
        Cliente: {order.name}
      </p>
      <ul
        role='list'
        className='divide-y divide-gray-200 text-sm font-medium text-gray-500 '
      >
        {order.orderProducts.map(orderProduct => (
          <li key={orderProduct.id} className='flex justify-between py-3'>
            <span>{orderProduct.product.name}</span>
            <span>{orderProduct.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
