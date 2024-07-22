import AddProductsForm from '@/components/products/AddProductsForm'
import ProductForm from '@/components/products/ProductForm'
import Heading from '@/components/ui/Heading'

const CrearProducto = () => {
  return (
    <>
      <Heading>Nuevo Producto</Heading>
      <AddProductsForm>
        <ProductForm />
      </AddProductsForm>
    </>
  )
}
export default CrearProducto
