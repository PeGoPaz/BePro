import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import BookingPage from "./pages/BookingPage";
import CustomerDashboardPage from "./pages/CustomerDashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProviderDashboardPage from "./pages/ProviderDashboardPage";
import ProviderListingsPage from "./pages/ProviderListingsPage";
import RegisterPage from "./pages/RegisterPage";

/*
 * MainLayout — shared shell for all pages that show the header and footer.
 * Auth pages (Login, Register) render without this wrapper so users see
 * only the form, with no navigation chrome.
 */
function MainLayout({ children }) {
  return (
    <div className="page">
      <AppHeader />
      <main>{children}</main>
      <AppFooter />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes — full-screen, no header or footer */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Main app routes — wrapped with header and footer */}
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/providers" element={<MainLayout><ProviderListingsPage /></MainLayout>} />
        <Route path="/booking" element={<MainLayout><BookingPage /></MainLayout>} />
        <Route
          path="/dashboard/customer"
          element={<MainLayout><CustomerDashboardPage /></MainLayout>}
        />
        <Route
          path="/dashboard/provider"
          element={<MainLayout><ProviderDashboardPage /></MainLayout>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
