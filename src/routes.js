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
import PreviewResumeImprovements from "./components/common/PreviewResumeImprovements";
import PreviewResumeLayout from "./components/common/PreviewResumeLayout";
import WelcomeProPage from "./pages/WelcomeProPage";
import { useAuth } from "./contexts/AuthContext";

function AppRoutes() {

  const { requireAuth, redirectIfAuth } = useAuth();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
            <Route path="/" element={redirectIfAuth(<Home/>)} />
            <Route path="/pricing" element={<PricingPage />}/>
            <Route path="/welcome" element={<WelcomeProPage/>}/>
            <Route path="/login" element={redirectIfAuth(<Login/>)} />
            <Route path="/signup" element={redirectIfAuth(<SignupPage/>)} />
            <Route path="/dashboard" element={requireAuth(<Dashboard/>)} />
            <Route path="/profile" element={requireAuth(<Profile/>)} />
            <Route path="/resume" element={<ImproveResumePage/>} />
            <Route path="/create-resume" element={requireAuth(<CreateResumePage/>)} />
            <Route path="/preview-resume" element={requireAuth(<PreviewResumeLayout/>)} />
            <Route path="/improved" element={requireAuth(<PreviewResumeImprovements/>)} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default AppRoutes;