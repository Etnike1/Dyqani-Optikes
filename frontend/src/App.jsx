import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth, homePathForRole } from './context/AuthContext'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import DashboardPage from './pages/Dashboard'
import CustomersPage from './pages/Customers'
import CustomerDetailsPage from './pages/CustomerDetails'
import CategoriesPage from './pages/Categories'
import CategoryDetailsPage from './pages/CategoryDetails'
import ProductsPage from './pages/Products'
import ProductDetailsPage from './pages/ProductDetails'
import InventoryPage from './pages/Inventory'
import InventoryDetailsPage from './pages/InventoryDetails'
import OrdersPage from './pages/Orders'
import NewOrderPage from './pages/NewOrder'
import OrderDetailsPage from './pages/OrderDetails'
import PaymentsPage from './pages/Payments'
import NewPaymentPage from './pages/NewPayment'
import PaymentDetailsPage from './pages/PaymentDetails'
import PrescriptionsPage from './pages/Prescriptions'
import NewPrescription from './pages/NewPrescription'
import PrescriptionDetails from './pages/PrescriptionDetails'
import LensesPage from './pages/Lenses'
import NewLens from './pages/NewLens'
import LensDetails from './pages/LensDetails'
import CheckupsPage from './pages/Checkups'
import NewCheckup from './pages/NewCheckup'
import CheckupDetails from './pages/CheckupDetails'
import ReservationsPage from './pages/Reservations'
import NewReservation from './pages/NewReservation'
import ReservationDetails from './pages/ReservationDetails'
import NotificationsPage from './pages/Notifications'
import NewNotification from './pages/NewNotification'
import NotificationDetails from './pages/NotificationDetails'
import WarrantiesPage from './pages/Warranties'
import NewWarranty from './pages/NewWarranty'
import WarrantyDetails from './pages/WarrantyDetails'
import EditWarranty from './pages/EditWarranty'
import DeliveriesPage from './pages/Deliveries'
import NewDelivery from './pages/NewDelivery'
import DeliveryDetails from './pages/DeliveryDetails'
import EmployeesPage from './pages/Employees'
import NewEmployee from './pages/NewEmployee'
import EmployeeDetails from './pages/EmployeeDetails'
import SuppliersPage from './pages/Suppliers'
import NewSupplier from './pages/NewSupplier'
import SupplierDetails from './pages/SupplierDetails'
import VisitHistoryPage from './pages/VisitHistory'
import VisitHistoryDetailsPage from './pages/VisitHistoryDetails'
import StorePage from './pages/Store'
import CatalogPage from './pages/Catalog'
import MyOrdersPage from './pages/MyOrders'
import MyReservationsPage from './pages/MyReservations'
import MyPrescriptionsPage from './pages/MyPrescriptions'
import ProfilePage from './pages/Profile'
import AdminRoute from './routes/AdminRoute'
import EmployeeRoute from './routes/EmployeeRoute'
import ClientRoute from './routes/ClientRoute'

function RoleHomeRedirect() {
  const { user, isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Navigate to={homePathForRole(user.role)} replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<RoleHomeRedirect />} />

      {/* Client consumer routes */}
      <Route path="/store" element={<ClientRoute><StorePage /></ClientRoute>} />
      <Route path="/catalog" element={<ClientRoute><CatalogPage /></ClientRoute>} />
      <Route path="/my-orders" element={<ClientRoute><MyOrdersPage /></ClientRoute>} />
      <Route path="/my-orders/:id" element={<ClientRoute><OrderDetailsPage /></ClientRoute>} />
      <Route path="/my-reservations" element={<ClientRoute><MyReservationsPage /></ClientRoute>} />
      <Route path="/my-prescriptions" element={<ClientRoute><MyPrescriptionsPage /></ClientRoute>} />
      <Route path="/profile" element={<ClientRoute><ProfilePage /></ClientRoute>} />

      {/* Staff operational routes (Admin + Employee) */}
      <Route path="/dashboard" element={<EmployeeRoute><DashboardPage /></EmployeeRoute>} />
      <Route path="/customers" element={<EmployeeRoute><CustomersPage /></EmployeeRoute>} />
      <Route path="/customers/:id" element={<EmployeeRoute><CustomerDetailsPage /></EmployeeRoute>} />
      <Route path="/categories" element={<EmployeeRoute><CategoriesPage /></EmployeeRoute>} />
      <Route path="/categories/:id" element={<EmployeeRoute><CategoryDetailsPage /></EmployeeRoute>} />
      <Route path="/products" element={<EmployeeRoute><ProductsPage /></EmployeeRoute>} />
      <Route path="/products/:id" element={<EmployeeRoute><ProductDetailsPage /></EmployeeRoute>} />
      <Route path="/inventory" element={<EmployeeRoute><InventoryPage /></EmployeeRoute>} />
      <Route path="/inventory/:id" element={<EmployeeRoute><InventoryDetailsPage /></EmployeeRoute>} />
      <Route path="/orders" element={<EmployeeRoute><OrdersPage /></EmployeeRoute>} />
      <Route path="/orders/new" element={<EmployeeRoute><NewOrderPage /></EmployeeRoute>} />
      <Route path="/orders/:id" element={<EmployeeRoute><OrderDetailsPage /></EmployeeRoute>} />
      <Route path="/prescriptions" element={<EmployeeRoute><PrescriptionsPage /></EmployeeRoute>} />
      <Route path="/prescriptions/new" element={<EmployeeRoute><NewPrescription /></EmployeeRoute>} />
      <Route path="/prescriptions/:id" element={<EmployeeRoute><PrescriptionDetails /></EmployeeRoute>} />
      <Route path="/checkups" element={<EmployeeRoute><CheckupsPage /></EmployeeRoute>} />
      <Route path="/checkups/new" element={<EmployeeRoute><NewCheckup /></EmployeeRoute>} />
      <Route path="/checkups/:id" element={<EmployeeRoute><CheckupDetails /></EmployeeRoute>} />
      <Route path="/visit-history" element={<EmployeeRoute><VisitHistoryPage /></EmployeeRoute>} />
      <Route path="/visit-history/:id" element={<EmployeeRoute><VisitHistoryDetailsPage /></EmployeeRoute>} />
      <Route path="/reservations" element={<EmployeeRoute><ReservationsPage /></EmployeeRoute>} />
      <Route path="/reservations/new" element={<EmployeeRoute><NewReservation /></EmployeeRoute>} />
      <Route path="/reservations/:id" element={<EmployeeRoute><ReservationDetails /></EmployeeRoute>} />
      <Route path="/notifications" element={<EmployeeRoute><NotificationsPage /></EmployeeRoute>} />
      <Route path="/notifications/new" element={<EmployeeRoute><NewNotification /></EmployeeRoute>} />
      <Route path="/notifications/:id" element={<EmployeeRoute><NotificationDetails /></EmployeeRoute>} />
      <Route path="/warranties" element={<EmployeeRoute><WarrantiesPage /></EmployeeRoute>} />
      <Route path="/warranties/new" element={<EmployeeRoute><NewWarranty /></EmployeeRoute>} />
      <Route path="/warranties/:id" element={<EmployeeRoute><WarrantyDetails /></EmployeeRoute>} />
      <Route path="/warranties/:id/edit" element={<EmployeeRoute><EditWarranty /></EmployeeRoute>} />
      <Route path="/deliveries" element={<EmployeeRoute><DeliveriesPage /></EmployeeRoute>} />
      <Route path="/deliveries/new" element={<EmployeeRoute><NewDelivery /></EmployeeRoute>} />
      <Route path="/deliveries/:id" element={<EmployeeRoute><DeliveryDetails /></EmployeeRoute>} />
      <Route path="/lenses" element={<EmployeeRoute><LensesPage /></EmployeeRoute>} />
      <Route path="/lenses/new" element={<EmployeeRoute><NewLens /></EmployeeRoute>} />
      <Route path="/lenses/:id" element={<EmployeeRoute><LensDetails /></EmployeeRoute>} />
      <Route path="/payments" element={<EmployeeRoute><PaymentsPage /></EmployeeRoute>} />
      <Route path="/payments/new" element={<EmployeeRoute><NewPaymentPage /></EmployeeRoute>} />
      <Route path="/payments/:id" element={<EmployeeRoute><PaymentDetailsPage /></EmployeeRoute>} />

      {/* Admin-only routes */}
      <Route path="/employees" element={<AdminRoute><EmployeesPage /></AdminRoute>} />
      <Route path="/employees/new" element={<AdminRoute><NewEmployee /></AdminRoute>} />
      <Route path="/employees/:id" element={<AdminRoute><EmployeeDetails /></AdminRoute>} />
      <Route path="/suppliers" element={<AdminRoute><SuppliersPage /></AdminRoute>} />
      <Route path="/suppliers/new" element={<AdminRoute><NewSupplier /></AdminRoute>} />
      <Route path="/suppliers/:id" element={<AdminRoute><SupplierDetails /></AdminRoute>} />

      <Route path="*" element={<RoleHomeRedirect />} />
    </Routes>
  )
}
