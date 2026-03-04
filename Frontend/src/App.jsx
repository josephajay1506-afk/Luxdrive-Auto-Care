import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import AddVehicle from "./pages/AddVehicles";
import Bookings from "./pages/Bookings";
import AddBooking from "./pages/AddBooking";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Notifications from "./pages/Notifications";
import Invoices from "./pages/Invoices";
import Reports from "./pages/Reports";
import Services from "./pages/Services";
import Offers from "./pages/Offers";
import Membership from "./pages/Membership";
import MembershipModal from "./components/MembershipModal";
import AboutUs from "./pages/AboutUs";
import AdminPriceApproval from "./pages/AdminPriceApproval"; 
import ServiceCatalog from "./pages/ServiceCatalog";
import ServiceSelect from "./pages/ServiceSelect";
import ContactUs from "./pages/ContactUs";

import { getUser } from "./utils/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import AdminMessages from "./pages/AdminMessage";
import AdminUsers from "./pages/AdminUsers";
import TuningStages from "./pages/TuningStages";
import Accessories from "./pages/Accessories";
import SelectAccessories from "./pages/SelectAccessories";
import ServiceHistory from "./pages/ServiceHistory";
import AdminAppointments from "./pages/AdminAppointments";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      <ScrollToTop /> {/* ✅ THIS FIXES SCROLL ISSUE */}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />

        <Route path="/vehicles" element={<ProtectedRoute><Vehicles /></ProtectedRoute>} />
        <Route path="/add-vehicle" element={<ProtectedRoute><AddVehicle /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
        <Route path="/add-booking" element={<ProtectedRoute><AddBooking /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
         <Route 
         path="/admin/price-approval" 
         element={
         <ProtectedRoute>
          <AdminPriceApproval />
          </ProtectedRoute>}
          />

        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/membership" element={<ProtectedRoute><Membership /></ProtectedRoute>} />
        <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
        <Route path="/offers" element={<ProtectedRoute><Offers /></ProtectedRoute>} />
        <Route path="/membership-modal" element={<ProtectedRoute><MembershipModal /></ProtectedRoute>} />
        <Route path="/about-us" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
        <Route path="/service-catalog" element={<ProtectedRoute><ServiceCatalog /></ProtectedRoute>} />
        <Route path="/select-services" element={<ProtectedRoute><ServiceSelect /></ProtectedRoute>} />
        <Route path="/contact-us" element={<ProtectedRoute><ContactUs/></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages/></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/appointments" element={<ProtectedRoute><AdminAppointments /></ProtectedRoute>} />
        <Route path="/tuning-stages" element={<ProtectedRoute><TuningStages /></ProtectedRoute>} />
        <Route path="/accessories" element={<ProtectedRoute><Accessories /></ProtectedRoute>} />
        <Route path="/select-accessories" element={<ProtectedRoute><SelectAccessories /></ProtectedRoute>} />
        <Route path="/service-history" element={<ProtectedRoute><ServiceHistory /></ProtectedRoute>} />

      </Routes>
    </>
  );
}

export default App;
