import { z } from 'zod'

export const OderderSchema = z.object({
  name: z.string()
    .min(3, 'Tu nombre es obligatorio'),
  total: z.number()
    .min(1, 'Hay error en la order'),
  order: z.array(z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    subtotal: z.number()
  }))
})

export const OrderIdSchema = z.object({
  orderId: z.string()
    .transform((value) => parseInt(value))
    .refine(value => value > 0, { message: 'Hay errores' })
})

export const SearchSchema = z.object({
  search: z.string()
    .trim()
    .min(1, { message: 'La busqueda no puede ir vacia' })
})
