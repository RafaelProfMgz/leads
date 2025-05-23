import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../components/layout/Layout";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";
import { jwtDecode } from "jwt-decode";

const Home = lazy(() => import("../pages/home/Home"));
const Login = lazy(() => import("../pages/login/Login"));
const Register = lazy(() => import("../pages/register/Register"));
const HeroPage = lazy(() => import("../pages/hero/HeroPage"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Leads = lazy(() => import("../pages/leads/Leads"));
const Settings = lazy(() => import("../pages/settings/Settings"));
const Documentation = lazy(
  () => import("../pages/documentation/Documentation"),
);
const Report = lazy(() => import("../pages/Report/Report"));
const ForgotPassword = lazy(
  () => import("../pages/forgot-password/ForgotPassword"),
);

const isValidToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return false;
  }
};

const ProtectedRoute = () => {
  const isLoggedIn = isValidToken();

  // If not logged in, redirect to /heropage
  return isLoggedIn ? <Outlet /> : <Navigate to="/heropage" />;
};

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/heropage" element={<HeroPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/home"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/settings"
              element={
                <Layout>
                  <Settings />
                </Layout>
              }
            />
            <Route
              path="/leads"
              element={
                <Layout>
                  <Leads />
                </Layout>
              }
            />
            <Route
              path="/docs"
              element={
                <Layout>
                  <Documentation />
                </Layout>
              }
            />
            <Route
              path="/report"
              element={
                <Layout>
                  <Report />
                </Layout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
          </Route>
          {/* Catch-all for not found routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
