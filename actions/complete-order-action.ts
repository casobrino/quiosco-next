'use server'

import { prisma } from '@/src/lib/prisma'
import { OrderIdSchema } from '@/src/schema/index'
import { revalidatePath } from 'next/cache'
export async function completeOrder (formData: FormData) {
  const data = {
    orderId: formData.get('order_id')
  }
  console.log(data)
  const result = OrderIdSchema.safeParse(data)
  if (result.success) {
    console.log(result.data.orderId)
    try {
      await prisma.order.update({
        where: {
          id: result.data.orderId
        }, data: {
          status: true,
          orderReadyAt: new Date(Date.now())
        }
      })
      revalidatePath('/admin/orders')
    } catch (error) {
      console.log(error)
    }
  }else{
    console.log(result.error)
  }
}
