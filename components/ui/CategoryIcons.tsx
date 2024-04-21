import { Category } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
type CategoryIcons = {
  category: Category
}
const CategoryIcons = ({ category }: CategoryIcons) => {
  return (
    <Link href={`/order/${category.slug}`} className='flex items-center gap-4 w-full border-t border-gray-100 p-3 last-of-type:border-b'>
      <div className='w-16 h-16 relative'>
        <Image src={`/icon_${category.slug}.svg`} alt={category.name} fill />
      </div>
      <span className='text-xl font-bold'>{category.name}</span>
    </Link>
  )
}

export default CategoryIcons
