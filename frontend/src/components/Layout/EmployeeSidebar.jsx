import SidebarShell from './SidebarShell'
import { EMPLOYEE_NAV } from './navConfig'

export default function EmployeeSidebar(props) {
  return <SidebarShell {...props} items={EMPLOYEE_NAV} subtitle="Paneli operativ" />
}
