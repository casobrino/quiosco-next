'use client'
import { updateProduct } from '@/actions/update-product-action'
import { ProductSchema } from '@/src/schema'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function EditProductForm ({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const params = useParams()
  const id = +params.slug

  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      price: formData.get('price'),
      categoryId: formData.get('categoryId'),
      image: formData.get('image')
    }

    const result = ProductSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach(error => {
        toast.error(error.message)
      })
      return
    }

    //TODO: migrar cloudinary a MULTER
    const response = await updateProduct(result.data, id)
    if (response?.errors) {
      response.errors.forEach(error => {
        toast.error(error.message)
      })
      return
    }
    toast.success('Producto actualizado correctamente')
  }
  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto'>
      <form
        className='space-y-5'
        action={handleSubmit}
      >
        {children}
        <input
          type="submit"
          className='bg-indigo-600 hover:bg-indigo-800 w-full uppercase p-3 font-bold cursor-pointer transition text-white rounded-xl'
          value='Guardar cambios'
        />
      </form>
    </div>
  )
}
