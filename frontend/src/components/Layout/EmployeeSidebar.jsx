import React from 'react'
import { NAV } from '../../constants/labels.sq'
import SidebarShell from './SidebarShell'

const EMPLOYEE_NAV_ITEMS = [
  { to: '/dashboard', label: NAV.dashboard, end: true },
  { to: '/customers', label: NAV.klientet },
  { to: '/orders', label: NAV.porosite },
  { to: '/reservations', label: NAV.rezervimet },
  { to: '/payments', label: NAV.pagesat },
  { to: '/prescriptions', label: NAV.recetat },
  { to: '/checkups', label: NAV.kontrolletSyve },
  { to: '/deliveries', label: NAV.dergesat },
]

export default function EmployeeSidebar({ open, onClose }) {
  return (
    <SidebarShell
      items={EMPLOYEE_NAV_ITEMS}
      subtitle="Paneli i punonjësit"
      open={open}
      onClose={onClose}
    />
  )
}
