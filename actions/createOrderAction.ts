'use server'

import { OderderSchema } from '@/src/schema'

export async function createOrder (data: unknown) {
  const result = OderderSchema.safeParse(data)
  if (!result.success) {
    return {
      errors: result.error.issues
    }
  }
  try {

  } catch (error) {
    console.log(error)
  }
}
