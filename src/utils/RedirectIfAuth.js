import Loader from "@/app/components/common/Loader";
import { useAuth } from "@/app/contexts/AuthContext";

const RedirectIfAuth = (Component) => {
  const WrapperComponent = (props) => {
    const { user, loading } = useAuth();

    if (loading) return <Loader />;

    if (user) {
      window.location = '/dashboard';
      return null;
    }

    return <Component {...props} />;
  };

  WrapperComponent.displayName = `RedirectIfAuth(${Component.displayName || Component.name || 'Component'})`;

  return WrapperComponent;
};

export default RedirectIfAuth;