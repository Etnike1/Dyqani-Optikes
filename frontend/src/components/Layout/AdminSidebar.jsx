import React from 'react'
import { NAV } from '../../constants/labels.sq'
import SidebarShell from './SidebarShell'

const ADMIN_NAV_ITEMS = [
  { to: '/dashboard', label: NAV.dashboard, end: true },
  { to: '/products', label: NAV.produktet },
  { to: '/categories', label: NAV.kategorite },
  { to: '/inventory', label: NAV.inventari },
  { to: '/orders', label: NAV.porosite },
  { to: '/payments', label: NAV.pagesat },
  { to: '/employees', label: NAV.punonjesit },
  { to: '/suppliers', label: NAV.furnitoret },
  { to: '/deliveries', label: NAV.dergesat },
  { to: '/notifications', label: NAV.njoftimet },
  { to: '/warranties', label: NAV.garancite },
  { to: '/reservations', label: NAV.rezervimet },
  { to: '/checkups', label: NAV.kontrolletSyve },
  { to: '/prescriptions', label: NAV.recetat },
  { to: '/customers', label: NAV.klientet },
  { to: '/visit-history', label: NAV.historikuVizitave },
  { to: '/lenses', label: NAV.lentet },
]

export default function AdminSidebar({ open, onClose }) {
  return (
    <SidebarShell
      items={ADMIN_NAV_ITEMS}
      subtitle="Menaxhimi i dyqanit"
      open={open}
      onClose={onClose}
    />
  )
}
