import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import ResumePage from "./pages/ResumePage";
import Profile from "./pages/ProfilePage";
import CreateResume from "./pages/CreateResume";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import HideLoginPage from "./components/HideLoginPage";
import PreviewResumeImprovements from "./components/common/PreviewResumeImprovements";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
            <Route path="/" element={<Home />} />
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
                <ResumePage />
              </ProtectedRoute>} />
            <Route path="/create-resume" element={
              <ProtectedRoute>
                <CreateResume />
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