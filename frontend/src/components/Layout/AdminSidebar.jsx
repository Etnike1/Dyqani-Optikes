import SidebarShell from './SidebarShell'
import { ADMIN_NAV } from './navConfig'

export default function AdminSidebar(props) {
  return <SidebarShell {...props} items={ADMIN_NAV} subtitle="Paneli i administratorit" />
}
