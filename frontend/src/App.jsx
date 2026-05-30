import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <CustomersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers/:id"
        element={
          <ProtectedRoute>
            <CustomerDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <CategoriesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories/:id"
        element={
          <ProtectedRoute>
            <CategoryDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/:id"
        element={
          <ProtectedRoute>
            <ProductDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/inventory"
        element={
          <ProtectedRoute>
            <InventoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/inventory/:id"
        element={
          <ProtectedRoute>
            <InventoryDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders/new"
        element={
          <ProtectedRoute>
            <NewOrderPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders/:id"
        element={
          <ProtectedRoute>
            <OrderDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prescriptions"
        element={
          <ProtectedRoute>
            <PrescriptionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prescriptions/new"
        element={
          <ProtectedRoute>
            <NewPrescription />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prescriptions/:id"
        element={
          <ProtectedRoute>
            <PrescriptionDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkups"
        element={
          <ProtectedRoute>
            <CheckupsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkups/new"
        element={
          <ProtectedRoute>
            <NewCheckup />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkups/:id"
        element={
          <ProtectedRoute>
            <CheckupDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/visit-history"
        element={
          <ProtectedRoute>
            <VisitHistoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/visit-history/:id"
        element={
          <ProtectedRoute>
            <VisitHistoryDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reservations"
        element={
          <ProtectedRoute>
            <ReservationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reservations/new"
        element={
          <ProtectedRoute>
            <NewReservation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reservations/:id"
        element={
          <ProtectedRoute>
            <ReservationDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications/new"
        element={
          <ProtectedRoute>
            <NewNotification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications/:id"
        element={
          <ProtectedRoute>
            <NotificationDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/warranties"
        element={
          <ProtectedRoute>
            <WarrantiesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/warranties/new"
        element={
          <ProtectedRoute>
            <NewWarranty />
          </ProtectedRoute>
        }
      />
      <Route
        path="/warranties/:id"
        element={
          <ProtectedRoute>
            <WarrantyDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/warranties/:id/edit"
        element={
          <ProtectedRoute>
            <EditWarranty />
          </ProtectedRoute>
        }
      />
      <Route
        path="/deliveries"
        element={
          <ProtectedRoute>
            <DeliveriesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/deliveries/new"
        element={
          <ProtectedRoute>
            <NewDelivery />
          </ProtectedRoute>
        }
      />
      <Route
        path="/deliveries/:id"
        element={
          <ProtectedRoute>
            <DeliveryDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lenses"
        element={
          <ProtectedRoute>
            <LensesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lenses/new"
        element={
          <ProtectedRoute>
            <NewLens />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lenses/:id"
        element={
          <ProtectedRoute>
            <LensDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <EmployeesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employees/new"
        element={
          <ProtectedRoute>
            <NewEmployee />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employees/:id"
        element={
          <ProtectedRoute>
            <EmployeeDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/suppliers"
        element={
          <ProtectedRoute>
            <SuppliersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/suppliers/new"
        element={
          <ProtectedRoute>
            <NewSupplier />
          </ProtectedRoute>
        }
      />
      <Route
        path="/suppliers/:id"
        element={
          <ProtectedRoute>
            <SupplierDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <PaymentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payments/new"
        element={
          <ProtectedRoute>
            <NewPaymentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payments/:id"
        element={
          <ProtectedRoute>
            <PaymentDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

