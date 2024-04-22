import { prisma } from '@/src/lib/prisma'
import CategoryIcons from '../ui/CategoryIcons'

async function getCategories () {
  return await prisma.category.findMany()
}

const OrderSidebar = async () => {
  const categories = await getCategories()
  return (
    <aside className='md:w-72 md:h-screen bg-white'>
      <nav>
        {categories.map(category => (
          <CategoryIcons key={category.id} category={category} />
        ))}
      </nav>
    </aside>
  )
}

export default OrderSidebar
