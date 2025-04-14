import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import ImproveResumePage from "./pages/ImproveResumePage";
import Profile from "./pages/ProfilePage";
import CreateResumePage from "./pages/CreateResumePage";
import PricingPage from "./pages/PricingPage";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import HideLoginPage from "./components/HideLoginPage";
import PreviewResumeImprovements from "./components/common/PreviewResumeImprovements";
import PreviewResumeLayout from "./components/common/PreviewResumeLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<PricingPage />}/>
            <Route path="/login" element={
              <HideLoginPage>
                <Login/>
              </HideLoginPage>} />
              <Route path="/signup" element={
              <HideLoginPage>
                <SignupPage/>
              </HideLoginPage>} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>} />
            <Route path="/resume" element={
              <ProtectedRoute>
                <ImproveResumePage />
              </ProtectedRoute>} />
            <Route path="/create-resume" element={
              <ProtectedRoute>
                <CreateResumePage />
              </ProtectedRoute>} />
            <Route path="/preview-resume" element={
              <ProtectedRoute>
                <PreviewResumeLayout />
              </ProtectedRoute>} />
            <Route path="/improved" element={
              <ProtectedRoute>
                <PreviewResumeImprovements />
              </ProtectedRoute>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default AppRoutes;