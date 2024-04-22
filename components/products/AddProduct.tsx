'use client'
import { useStore } from '@/src/store'
import { Product } from '@prisma/client'
type AddProductProps = {
  product: Product
}
export const AddProduct = ({ product }: AddProductProps) => {
  const addToOrder = useStore(state => state.addToOrder)
  return (
    <button
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400"
      type='button'
      onClick={() => addToOrder(product)}
    >
      Add to cart
    </button>
  )
}
