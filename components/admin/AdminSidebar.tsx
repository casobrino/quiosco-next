import Link from 'next/link'
import Logo from '../ui/logo'

const adminNavigation = [
  { url: '/admin/orders', text: 'Ordenes', blank: false },
  { url: '/admin/products', text: 'Productos', blank: false },
  { url: '/order/cafe', text: 'Ver Quiosco', blank: true },
]

export default function AdminSidebar () {

  return (
    <>
      <Logo />
      <div className="space-y-3 ">
        <p className="mt-10 uppercase font-bold text-sm text-gray-600 text-center">Navegación</p>
        <nav className="flex flex-col">
          {adminNavigation.map(i => <Link id={i.url} href={i.url}>{i.text}</Link>
          )}
        </nav>
      </div>
    </>

  )
}