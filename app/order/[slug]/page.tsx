import ProductCard from '@/components/products/ProductCard'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
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
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 px-4 py-10 items-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
