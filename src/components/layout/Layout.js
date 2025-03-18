import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useAuth } from "../../contexts/AuthContext";
import VerifyEmailReminder from "../../components/common/VerifyEmailReminder"

function Layout({ children }) {
  const {user, verified} = useAuth();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        {user && <Sidebar />}
        <main className="flex-1 p-5">
          {/* In case email is not verified */}
          {(user && !verified) ? <VerifyEmailReminder/> : ""}
          {children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;