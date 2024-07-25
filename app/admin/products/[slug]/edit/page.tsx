import EditProductForm from '@/components/products/EditProductForm'
import ProductForm from '@/components/products/ProductForm'
import GoBackButton from '@/components/ui/GoBackButton'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const getProduct = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: {
      id
    }
  })
  return product
}

export default async function EditProductsPage ({ params }: { params: { slug: string } }) {
  const id = +params.slug
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <>
      <GoBackButton />
      <Heading>
        Editar Producto: {product.name}
      </Heading>
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  )
}
