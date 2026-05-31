import { NAV } from '../../constants/labels.sq'

export const ADMIN_NAV = [
  { to: '/dashboard', label: NAV.dashboard },
  { to: '/customers', label: NAV.klientet },
  { to: '/categories', label: NAV.kategorite },
  { to: '/products', label: NAV.produktet },
  { to: '/inventory', label: NAV.inventari },
  { to: '/orders', label: NAV.porosite },
  { to: '/payments', label: NAV.pagesat },
  { to: '/prescriptions', label: NAV.recetat },
  { to: '/checkups', label: NAV.kontrolletSyve },
  { to: '/visit-history', label: NAV.historikuVizitave },
  { to: '/reservations', label: NAV.rezervimet },
  { to: '/lenses', label: NAV.lentet },
  { to: '/deliveries', label: NAV.dergesat },
  { to: '/warranties', label: NAV.garancite },
  { to: '/notifications', label: NAV.njoftimet },
  { to: '/employees', label: NAV.punonjesit },
  { to: '/suppliers', label: NAV.furnitoret },
]

export const EMPLOYEE_NAV = ADMIN_NAV.filter(
  (item) => item.to !== '/employees' && item.to !== '/suppliers'
)

export const CLIENT_NAV = [
  { to: '/store', label: 'Dyqani' },
  { to: '/catalog', label: 'Katalogu' },
  { to: '/my-orders', label: 'Porositë e mia' },
  { to: '/my-reservations', label: 'Rezervimet e mia' },
  { to: '/my-prescriptions', label: 'Recetat e mia' },
  { to: '/profile', label: 'Profili' },
]

export const ROLE_LABELS = {
  ROLE_ADMIN: 'Administrator',
  ROLE_EMPLOYEE: 'Punonjës',
  ROLE_CLIENT: 'Klient',
}
