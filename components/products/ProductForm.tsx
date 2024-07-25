import { prisma } from '@/src/lib/prisma'
import ImageUpload from './ImageUpload'
import { Product } from '@prisma/client'
import Image from 'next/image'

async function getCategories () {
  const categories = prisma.category.findMany()
  return categories
}

type ProductFormProps = {
  product?: Product
}

export default async function ProductForm ({ product }: ProductFormProps) {
  const categories = await getCategories()
  return (
    <>
      <div className="space-y-2">
        <label
          className="text-slate-800"
          htmlFor="name"
        >Nombre:</label>
        <input
          id="name"
          type="text"
          name="name"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-slate-100"
          placeholder="Nombre Producto"
          defaultValue={product?.name}
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-slate-800"
          htmlFor="price"
        >Precio:</label>
        <input
          id="price"
          name="price"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-slate-100"
          placeholder="Precio Producto"
          defaultValue={product?.price}
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-slate-800"
          htmlFor="categoryId"
        >Categoría:</label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="categoryId"
          name="categoryId"
          defaultValue={product?.categoryId}
        >
          <option value="">-- Seleccione --</option>
          {
            categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          }
        </select>
        <ImageUpload 
          image={product?.image}
        />
      </div>
    </>
  )
}
