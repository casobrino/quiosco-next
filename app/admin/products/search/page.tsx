import ProductTable from '@/components/products/ProductsTable'
import ProductSearchForm from '@/components/products/SearchForm'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'

async function searchProducts (searchTerm: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive',
      }
    }, include: {
      category: true
    }
  })
  return products
}

export default async function SearchPage ({ searchParams }: { searchParams: { search: string } }) {
  const products = await searchProducts(searchParams.search)

  return (
    <div>
      <Heading>Resultados de busqueda: <span className='black capitalize'>{searchParams.search}</span></Heading>
      <div className='flex flex-col gap-5 lg:flex-row lg: justify-between'>
        <ProductSearchForm />
      </div>
      {
        products.length
          ?
          <ProductTable
            products={products}
          />
          :
          <div className=' w-full py-10 mt-5 text-center bg-white'>
            <p className='text-lg'>No se encontraron productos</p>
          </div>
      }

    </div>
  )
}
