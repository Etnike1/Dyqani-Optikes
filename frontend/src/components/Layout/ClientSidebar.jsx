import React from 'react'
import { NAV } from '../../constants/labels.sq'
import SidebarShell from './SidebarShell'

const CLIENT_NAV_ITEMS = [
  { to: '/store', label: NAV.store, end: true },
  { to: '/catalog', label: NAV.catalog },
  { to: '/my-orders', label: NAV.myOrders },
  { to: '/my-reservations', label: NAV.myReservations },
  { to: '/my-prescriptions', label: NAV.myPrescriptions },
  { to: '/profile', label: NAV.profile },
]

export default function ClientSidebar({ open, onClose }) {
  return (
    <SidebarShell
      items={CLIENT_NAV_ITEMS}
      subtitle="Llogaria ime"
      open={open}
      onClose={onClose}
    />
  )
}
