import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ARViewerPage from "./pages/ARViewerPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import ProjectsByCityPage from "./pages/ProjectsByCityPage";
import PricingPackagesPage from "./pages/PricingPackagesPage";
import ARExperiencePage from "./pages/ARExperiencePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import InteriorDesignPage from "./pages/InteriorDesignPage";

const App = () => {
  const location = useLocation();
  const isARRoute = location.pathname.startsWith("/ar/");

  return (
    <div className="app-shell">
      <div className="aura-bg-element aura-1"></div>
      <div className="aura-bg-element aura-2"></div>
      <div className="aura-bg-element aura-3"></div>
      {!isARRoute ? <Navbar /> : null}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/completed-homes" element={<ProjectsPage />} />
          <Route path="/interior-design" element={<InteriorDesignPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/ar-experience" element={<ARExperiencePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects-by-city" element={<ProjectsByCityPage />} />
          <Route path="/pricing" element={<PricingPackagesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/ar/:slug" element={<ARViewerPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isARRoute ? <Footer /> : null}
    </div>
  );
};

export default App;
