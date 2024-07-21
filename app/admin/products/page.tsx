import { redirect } from 'next/navigation'
import ProductPagination from '@/components/products/ProductsPagination'
import ProductTable from '@/components/products/ProductsTable'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'

async function productCount () {
  return await prisma.product.count()
}

async function getProducts (page: number, pageSize: number) {
  const skip = (page - 1) * pageSize
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true
    }
  })
  return products
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage ({ searchParams }: { searchParams: { page: string } }) {
  const pageSize = 10
  const page = parseInt(searchParams.page) || 1

  if(page < 0) redirect('/admin/products')

  const productsData = getProducts(page, pageSize)
  const totaProductsData = productCount()
  const [products, totalProducts] = await Promise.all([productsData, totaProductsData])
  const totalPages = Math.ceil(totalProducts / pageSize)
  
  if(page > totalPages) redirect('/admin/products')

  return (
    <>
      <Heading>Products</Heading>
      <ProductTable
        products={products}
      />
      <ProductPagination
        page={page} 
        totalPages = {totalPages}
      />
    </>
  )
}
