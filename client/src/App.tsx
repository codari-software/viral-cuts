import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Editor from "./pages/Editor";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

// Landing Pages
import LandingHome from "./pages/Landing/LandingHome";
import Roadmap from "./pages/Landing/Roadmap";
import About from "./pages/Landing/About";
import Blog from "./pages/Landing/Blog";
import BlogPost from "./pages/Landing/BlogPost";
import PrivacyPolicy from "./pages/Landing/PrivacyPolicy";
import TermsOfService from "./pages/Landing/TermsOfService";
import ScrollToTop from "./components/landing/ScrollToTop";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingHome />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />

        {/* Auth Routes */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={<Navigate to="/login" />} /> {/* Redirect register to login or handle appropriately if you have a register page */}

        {/* Protected App Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/projects" element={<Projects />} />
          <Route path="/editor" element={<Navigate to="/editor/new" replace />} />
          <Route path="/editor/:projectId" element={<Editor />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
            <AppRoutes />
            <ToastContainer theme="dark" />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
