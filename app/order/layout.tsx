import OrderSidebar from '@/components/OrderSidebar'
import OrderSumary from '@/components/OrderSumary'

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
    </>
  )
}
