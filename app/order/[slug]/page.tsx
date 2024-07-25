import ProductCard from '@/components/products/ProductCard'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import { revalidatePath } from 'next/cache'
const getProducts = async (category: string) => {
  return await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
}
export default async function OrderPage ({ params }: { params: { slug: string } }) {
  const products = await getProducts(params.slug)

  return (
    <div>
      <Heading>
        Elige y personaliza tu orden
      </Heading>

      <form action={async () => {
        'use server'
        revalidatePath('/admin/orders')
      }}>
        <input
          type="submit"
          value='Actualizar ordenes'
          className='bg-amber-400 rounded w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer hover:bg-amber-600 hover:text-white transition-all'

        />
      </form>
      <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-5 gap-4 px-4 py-10 items-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
