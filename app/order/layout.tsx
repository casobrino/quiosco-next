import OrderSidebar from '@/components/orders/OrderSidebar'
import OrderSumary from '@/components/orders/OrderSumary'
import ToastNotification from '@/components/ui/toast-notification'

export default function RootLayout ({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className='md:flex'>
        <OrderSidebar />
        <main className='md:flex-1 md:h-screen md:overflow-y-scroll'>
          {children}
        </main>
        <OrderSumary />
      </div>
      <ToastNotification />
    </>
  )
}
