import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "../components/layout/Layout";
import Loading from "../components/Loading";

const Login = lazy(() => import("../pages/login/Login"));
const Register = lazy(() => import("../pages/register/Register"));
const HeroPage = lazy(() => import("../pages/hero/HeroPage"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
import NotFound from "../components/NotFound";

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/heropage" />} />

          <Route
            path="/heropage"
            element={
              <Layout>
                <HeroPage />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
