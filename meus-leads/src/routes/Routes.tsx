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

const Login = lazy(() => import("../pages/login/Login"));
const Register = lazy(() => import("../pages/register/Register"));
const HeroPage = lazy(() => import("../pages/hero/HeroPage"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Leads = lazy(() => import("../pages/leads/Leads"));
const Settings = lazy(() => import("../pages/settings/Settings"));
const Documentation = lazy(
  () => import("../pages/documentation/Documentation"),
);
const Report = lazy(() => import("../pages/Report/Report"));
import NotFound from "../components/NotFound";
import { jwtDecode } from "jwt-decode";

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

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/heropage" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/heropage"
              element={
                <Layout>
                  <HeroPage />
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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
