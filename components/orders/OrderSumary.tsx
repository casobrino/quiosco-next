'use client'
import { createOrder } from '@/actions/createOrderAction'
import { OderderSchema } from '@/src/schema'
import { useStore } from '@/src/store'
import FormatCurrency from '@/src/utils'
import { useMemo } from 'react'
import { toast } from 'react-toastify'
import { ProductDetails } from './ProductDetails'

export default function OrderSumary () {
  const order = useStore(state => state.order)
  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order
    }

    const result = OderderSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }

    const response = await createOrder(data)
    if (response?.errors) {
      response.errors.forEach(issue => {
        toast(issue.message)
      })
    }

  }

  return (
    <aside className='lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5'>
      <h1 className='text-4xl text-center font-black'>Mi pedido</h1>
      {order.length === 0
        ? <span className='text-center block my-10'>No items agregados</span>
        : (<div className='mt-5'> {order.map(item => (
          <ProductDetails key={item.id} item={item} />
        ))}</div>)
      }
      <p className='text-2xl mt-20 text-center'>Total a pagar: {''}<span className='font-bold'>{FormatCurrency(total)}</span></p>
      <form
        className='w-full space-y-5 mt-10 font-bold'
        action={handleCreateOrder}
      >
        <input
          type='text'
          placeholder='Tu nombre'
          className='p-2 w-full border border-gray'
          name='name'
        />
        <input
          type="submit"
          className='w-full p-2 roudned uppercase rounded mx-auto text-white bg-black cursor-pointer text-center'
          value='Confirmar pedido' />
      </form>
    </aside>
  )
}

