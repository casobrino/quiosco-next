import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from '@prisma/client'

interface Store {
  order: OrderItem[]
  addToOrder: (product: Product) => void
  increaseQuantity: (id: Product['id']) => void
  decreaseQuantity: (id: Product['id']) => void
  removeItem: (id: Product['id']) => void
  calculateTotal: (id: Product['id']) => number
}

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product) => {
    const { categoryId, image, ...data } = product
    let order: OrderItem[] = []
    if (get().order.find(item => item.id === data.id)) {
      order = get().order.map(item => item.id === data.id ? {
        ...item,
        quantity: item.quantity + 1,
        subtotal: (item.quantity + 1) * item.price
      } : item)
    } else {
      order = [...get().order, {
        ...data,
        quantity: 1,
        subtotal: 1 * data.price
      }]
    }
    set(() => ({
      order: order
    }))
  },
  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map(item => item.id === id ? {
        ...item,
        quantity: item.quantity + 1,
        subtotal: (item.quantity + 1) * item.price
      } : item)
    }))
  },
  decreaseQuantity: (id) => {
    set(state => ({
      order: state.order.map(item => item.id === id ? {
        ...item,
        quantity: item.quantity - 1,
        subtotal: (item.quantity - 1) * item.price
      } : item)
    }))
  },
  removeItem: (id) => {
    set(state => ({
      order: state.order.filter(item => item.id != id)
    }))
  },
  calculateTotal: (id) => {
    return 1
  }
}))
