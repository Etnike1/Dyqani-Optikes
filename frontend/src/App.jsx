import React from 'react'
import { Routes, Route } from 'react-router-dom'
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
import StorePage from './pages/client/Store'
import CatalogPage from './pages/client/Catalog'
import MyOrdersPage from './pages/client/MyOrders'
import MyReservationsPage from './pages/client/MyReservations'
import MyPrescriptionsPage from './pages/client/MyPrescriptions'
import ProfilePage from './pages/client/Profile'
import HomeRedirect from './routes/HomeRedirect'
import AdminRoute from './routes/AdminRoute'
import EmployeeRoute from './routes/EmployeeRoute'
import ClientRoute from './routes/ClientRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/" element={<HomeRedirect />} />

      {/* Client portal */}
      <Route path="/store" element={<ClientRoute><StorePage /></ClientRoute>} />
      <Route path="/catalog" element={<ClientRoute><CatalogPage /></ClientRoute>} />
      <Route path="/my-orders" element={<ClientRoute><MyOrdersPage /></ClientRoute>} />
      <Route path="/my-reservations" element={<ClientRoute><MyReservationsPage /></ClientRoute>} />
      <Route path="/my-prescriptions" element={<ClientRoute><MyPrescriptionsPage /></ClientRoute>} />
      <Route path="/profile" element={<ClientRoute><ProfilePage /></ClientRoute>} />

      {/* Staff dashboard */}
      <Route path="/dashboard" element={<EmployeeRoute><DashboardPage /></EmployeeRoute>} />
      <Route path="/admin/dashboard" element={<EmployeeRoute><DashboardPage /></EmployeeRoute>} />

      {/* Employee + Admin shared routes */}
      <Route path="/customers" element={<EmployeeRoute><CustomersPage /></EmployeeRoute>} />
      <Route path="/customers/:id" element={<EmployeeRoute><CustomerDetailsPage /></EmployeeRoute>} />
      <Route path="/orders" element={<EmployeeRoute><OrdersPage /></EmployeeRoute>} />
      <Route path="/orders/new" element={<EmployeeRoute><NewOrderPage /></EmployeeRoute>} />
      <Route path="/orders/:id" element={<EmployeeRoute><OrderDetailsPage /></EmployeeRoute>} />
      <Route path="/payments" element={<EmployeeRoute><PaymentsPage /></EmployeeRoute>} />
      <Route path="/payments/new" element={<EmployeeRoute><NewPaymentPage /></EmployeeRoute>} />
      <Route path="/payments/:id" element={<EmployeeRoute><PaymentDetailsPage /></EmployeeRoute>} />
      <Route path="/prescriptions" element={<EmployeeRoute><PrescriptionsPage /></EmployeeRoute>} />
      <Route path="/prescriptions/new" element={<EmployeeRoute><NewPrescription /></EmployeeRoute>} />
      <Route path="/prescriptions/:id" element={<EmployeeRoute><PrescriptionDetails /></EmployeeRoute>} />
      <Route path="/checkups" element={<EmployeeRoute><CheckupsPage /></EmployeeRoute>} />
      <Route path="/checkups/new" element={<EmployeeRoute><NewCheckup /></EmployeeRoute>} />
      <Route path="/checkups/:id" element={<EmployeeRoute><CheckupDetails /></EmployeeRoute>} />
      <Route path="/reservations" element={<EmployeeRoute><ReservationsPage /></EmployeeRoute>} />
      <Route path="/reservations/new" element={<EmployeeRoute><NewReservation /></EmployeeRoute>} />
      <Route path="/reservations/:id" element={<EmployeeRoute><ReservationDetails /></EmployeeRoute>} />
      <Route path="/deliveries" element={<EmployeeRoute><DeliveriesPage /></EmployeeRoute>} />
      <Route path="/deliveries/new" element={<EmployeeRoute><NewDelivery /></EmployeeRoute>} />
      <Route path="/deliveries/:id" element={<EmployeeRoute><DeliveryDetails /></EmployeeRoute>} />

      {/* Admin-only routes */}
      <Route path="/categories" element={<AdminRoute><CategoriesPage /></AdminRoute>} />
      <Route path="/categories/:id" element={<AdminRoute><CategoryDetailsPage /></AdminRoute>} />
      <Route path="/products" element={<AdminRoute><ProductsPage /></AdminRoute>} />
      <Route path="/products/:id" element={<AdminRoute><ProductDetailsPage /></AdminRoute>} />
      <Route path="/inventory" element={<AdminRoute><InventoryPage /></AdminRoute>} />
      <Route path="/inventory/:id" element={<AdminRoute><InventoryDetailsPage /></AdminRoute>} />
      <Route path="/notifications" element={<AdminRoute><NotificationsPage /></AdminRoute>} />
      <Route path="/notifications/new" element={<AdminRoute><NewNotification /></AdminRoute>} />
      <Route path="/notifications/:id" element={<AdminRoute><NotificationDetails /></AdminRoute>} />
      <Route path="/warranties" element={<AdminRoute><WarrantiesPage /></AdminRoute>} />
      <Route path="/warranties/new" element={<AdminRoute><NewWarranty /></AdminRoute>} />
      <Route path="/warranties/:id" element={<AdminRoute><WarrantyDetails /></AdminRoute>} />
      <Route path="/warranties/:id/edit" element={<AdminRoute><EditWarranty /></AdminRoute>} />
      <Route path="/lenses" element={<AdminRoute><LensesPage /></AdminRoute>} />
      <Route path="/lenses/new" element={<AdminRoute><NewLens /></AdminRoute>} />
      <Route path="/lenses/:id" element={<AdminRoute><LensDetails /></AdminRoute>} />
      <Route path="/employees" element={<AdminRoute><EmployeesPage /></AdminRoute>} />
      <Route path="/employees/new" element={<AdminRoute><NewEmployee /></AdminRoute>} />
      <Route path="/employees/:id" element={<AdminRoute><EmployeeDetails /></AdminRoute>} />
      <Route path="/suppliers" element={<AdminRoute><SuppliersPage /></AdminRoute>} />
      <Route path="/suppliers/new" element={<AdminRoute><NewSupplier /></AdminRoute>} />
      <Route path="/suppliers/:id" element={<AdminRoute><SupplierDetails /></AdminRoute>} />
      <Route path="/visit-history" element={<AdminRoute><VisitHistoryPage /></AdminRoute>} />
      <Route path="/visit-history/:id" element={<AdminRoute><VisitHistoryDetailsPage /></AdminRoute>} />

      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  )
}
