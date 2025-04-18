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
      
      <div className="flex">
        <div className="flex-none">
          {user && <Sidebar />}
        </div>
        <div className="flex-1">
          <main>
            {/* In case email is not verified */}
            {(user && !verified) ? <VerifyEmailReminder/> : ""}
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;