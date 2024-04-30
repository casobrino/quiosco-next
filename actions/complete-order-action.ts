'use server'

import { prisma } from '@/src/lib/prisma'

export async function completeOrder (formData: FormData) {
  const id = formData.get('order_id')!
  console.log(id)

  try {
    const result = await prisma.order.update({
      where: {
        id: +id
      }, data: {
        status: true,
        orderReadyAt: new Date(Date.now())
      }
    })
  } catch (error) {
    console.log(error)
  }
}
