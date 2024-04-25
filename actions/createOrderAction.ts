'use server'

import { prisma } from '@/src/lib/prisma'
import { OderderSchema } from '@/src/schema'

export async function createOrder (data: unknown) {
  const result = OderderSchema.safeParse(data)
  if (!result.success) {
    return {
      errors: result.error.issues
    }
  }
  try {
    const { name, order, total } = result.data
    await prisma.order.create({
      data: {
        name,
        total,
        orderProducts: {
          create: order.map(product => ({
            productId: product.id,
            quantity: product.quantity
          }))
        }
      }
    })
  } catch (error) {
    console.log(error)
  }
}
